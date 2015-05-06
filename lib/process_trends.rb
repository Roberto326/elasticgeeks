require 'csv'
require 'open-uri'

class ProcessTrends

  def self.trends_for_parent(parent_id = nil)

    Category.where(parent_id: parent_id).each do |category|
      trends_for_category(category)

      trends_for_parent(category.to_param)
    end

  end

  def self.trends_for_category(category)

    # category = Category.where(name:'Compiled Programming Languages').first
    puts "Processing Trends for #{category.name}"

    # Erase previous results
    Trend.delete_all(category_id:category.to_param)
    TrendDetail.delete_all(category_id:category.to_param)

    trend_details = []

    csv_data = download_trends(category)
    csv_data = csv_data.gsub(/\"/,"").gsub(/,\ /,',')

    hsh_sum = {}
    total_sum = {}
    col_index = {}
    first = true
    CSV.new(csv_data, { :headers => true, :skip_lines => '^#'}).each do |csv_row|

      row = csv_row.to_hash

      if first
        row.keys.each_with_index do |c, index|
          next if index == 0 # Skip DATE column
          c = c.strip

          item = Item.where(category_id:category.to_param, wiki_name:c).first
          unless item
            puts "****"
            puts "ITEM NOT FOUND - WHEN MATCHING WITH DOWNLOADED RESULTS"
            puts c
            puts "****"
          end
          col_index[c] = {index:index, item:item}
        end
      end
      first = false

      begin
        date  = Date.parse(row['Date'])

        #Loop Through Items
        col_index.each do |key, value|

          item    = value[:item]
          item_id = item.to_param
          score   = row[key].to_i

          # Monthly Scores
          if hsh_sum[item_id].blank?
            hsh_sum[item_id] = score
          else
            hsh_sum[item_id] += score
          end

          # Total Scores
          if total_sum[item_id].blank?
            total_sum[item_id] = hsh_sum[item_id]
          else
            total_sum[item_id] += hsh_sum[item_id]
          end
        end

        # Last day of the month
        if date.month != date.next_day.month
          save_sum(trend_details, category.to_param, date, hsh_sum)
          hsh_sum = {}
        end

      rescue => e
        puts e.message
      end
    end

    TrendDetail.import trend_details

    apply_standard_deviation(category, trend_details)

    calculate_rank(category.to_param, total_sum)

  end

  def self.apply_standard_deviation(category, trend_details)

    category.items.each do |item|

      scores_all = TrendDetail.where(category_id:category.id, item_id:item.id).order('date asc').pluck(:id, :score)
      ids        = scores_all.map{|i| i[0]}
      scores     = scores_all.map{|i| i[1]}

      # Adjust scores limiting them to standard deviation
      scores.each_with_index do |score_item, idx|
        deviation = 0

        if idx > 3
          delta = idx > 12 ? 12 : idx
          sliced_score = scores.slice(idx-delta, delta)
          deviation = sliced_score.stats_standard_deviation
        end

        # Check and Adjust
        if deviation > 10
          delta_plus  = (scores[idx-1] + deviation).to_i
          delta_minus = (scores[idx-1] - deviation).to_i

          scores[idx] = delta_plus  if scores[idx] > delta_plus
          scores[idx] = delta_minus if scores[idx] < delta_minus
        end
      end

      ids.each_with_index do |id, idx|
        TrendDetail.find(id).update_attribute(:score, scores[idx])
      end
    end
  end

  def self.calculate_rank(category_id, total_sum)
    data = []
    total_sum.each do |item_id, score|
      next if item_id.nil?

      scores = TrendDetail.where(category_id:category_id, item_id:item_id).order('date desc').pluck(:score)

      scores_now  = scores.slice( 0,12).reject{|item| item == 0}
      scores_year = scores.slice(12,12).reject{|item| item == 0}

      record = {
        item_id:  item_id,
        score:    score,
        td_now:   scores[0],
        td_year:  scores[12],
        avg_now:  scores_now.present? ? (scores_now.inject(0.0) {|sum,item| sum+item} / scores_now.count).to_i : 0,
        avg_year: scores_year.present? ? (scores_year.inject(0.0) {|sum,item| sum+item} / scores_year.count).to_i : 0,
        rank_year: 0,
        rank_now:  0
      }

      data << record
    end

    # sort by score last year
    rank = 1
    data.sort_by{|i| i[:td_year]}.reverse.each do |data_item|
      data_item[:rank_year] = rank
      rank += 1
    end

    # sort by current score
    rank = 1
    data.sort_by{|i| i[:td_now]}.reverse.each do |data_item|
      data_item[:rank_now] = rank
      rank += 1
    end

    # calculate rank trend
    data.each do |data_item|
      diff = data_item[:rank_year] - data_item[:rank_now]
      trend = 0

      if diff == 0
        trend = 0
      elsif diff == 1
        trend = -1
      elsif diff > 1
        trend = -2
      elsif diff == -1
        trend = 1
      elsif diff < -1
        trend = 2
      end

      data_item[:trend] = trend
    end

    # calculate real trend
    data.each do |data_item|
      trend = 0

      if data_item[:avg_now] > 0 && data_item[:avg_year] > 0
        factor = data_item[:avg_now] / data_item[:avg_year].to_f

        puts data_item[:item_id]
        puts factor

        if factor >= 1.5
          trend = 3
        elsif factor >= 1.35
          trend = 2
        elsif factor >= 1.18
          trend = 1
        elsif factor > 0.95
          trend = 0
        elsif factor > 0.80
          trend = -1
        elsif factor > 0.60
          trend = -2
        else
          trend = -3
        end
      end

      data_item[:real_trend] = trend
    end

    #Save
    trends = []
    data.each do |data_item|
      trends << Trend.new(category_id:category_id, item_id:data_item[:item_id], trend:data_item[:trend], real_trend:data_item[:real_trend], score:data_item[:score], rank:data_item[:rank_now], rank_year:data_item[:rank_year])
    end

    Trend.import trends
  end

  def self.save_sum(trend_details, category_id, date, hsh_sum)
    hsh_sum.each do |item_id, score|
      next if category_id.nil?
      next if item_id.nil?
      next if date.nil?
      # Score is monthly average
      trend_details << TrendDetail.new(category_id:category_id, item_id:item_id, date:date, score:score / date.day)
    end
  end


  def self.download_entity_names(category)
    # JAVA
    # https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&callback=JSON_CALLBACK&languages=en&props=aliases%7Clabels%7Csitelinks&sitefilter=enwiki&ids=Q251
    # Pig (programming language)
    # https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&callback=JSON_CALLBACK&languages=en&props=aliases%7Clabels%7Csitelinks&sitefilter=enwiki&ids=Q7193204
    url = 'http://www.wikidata.org/w/api.php?action=wbgetentities&format=json&languages=en&props=aliases%7Clabels%7Csitelinks&sitefilter=enwiki&ids='

    aliases = {}.with_indifferent_access
    category.items.each do |item|
      aliases[item.id] = {wiki_id:item.wiki_id, wiki_name:nil}
    end

    if (aliases.present?)
      url    += aliases.map{|k,v| v[:wiki_id]}.compact.join('%7C')
      content = open(url).read
      hsh     = JSON.parse(content)

      if hsh['entities'].present?
        hsh['entities'].each do |k,v|

          if v['sitelinks'].present? && v['sitelinks']['enwiki'].present?
            # Find matching wiki_id
            aliases.each do |item_id,data|

              if data[:wiki_id] == k
                data[:wiki_name] = v['sitelinks']['enwiki']['title']
                next
              end
            end

          elsif v['aliases'].present?
            # Find matching wiki_id
            aliases.each do |item_id,data|

              if data[:wiki_id] == k
                data[:wiki_name] = v['aliases']['en'][0]['value']
                next
              end
            end

          elsif v['labels'].present?

            # Find matching wiki_id
            aliases.each do |item_id,data|

              if data[:wiki_id] == k
                data[:wiki_name] = v['labels']['en']['value']
                next
              end
            end

          end

        end
      end

    end

    # Update Wiki Names
    category.items.each do |item|
      item.update_attribute(:wiki_name, aliases[item.id][:wiki_name] )
    end

    aliases.with_indifferent_access
  end

  def self.download_trends(category)
    # Get Aliases
    aliases = download_entity_names(category)

    # url = "http://www.wikipediatrends.com/csv.php?query[]=Apache+Tomcat&query[]=IIS"
    url = 'http://www.wikipediatrends.com/csv.php?'

    url += category.items.map do |item|

      search = aliases[item.id][:wiki_name]
      next if search.blank?

      "query[]=#{CGI::escape(search)}"
    end.join('&')

    content = open(url).read
    content
  end


end
