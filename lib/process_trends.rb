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

          item = Item.where(category_id:category.to_param, name:c).first
          col_index[c] = {index:index, item:item}

          # Erase previous results
          Trend.delete_all(category_id:category.to_param, item_id:item.to_param)
          TrendDetail.delete_all(category_id:category.to_param, item_id:item.to_param)
        end
      end
      first = false

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
    end

    TrendDetail.import trend_details

    calculate_rank(category.to_param, total_sum)

  end

  def self.calculate_rank(category_id, total_sum)
    data = []
    total_sum.each do |item_id, score|
      next if item_id.nil?

      record = {
        item_id: item_id,
        score:   score,
        td_now:  TrendDetail.where(category_id:category_id, item_id:item_id).order(:date)[ -1].score,
        td_year: TrendDetail.where(category_id:category_id, item_id:item_id).order(:date)[-13].score,
        rank_year: 0,
        rank_now: 0
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

    # calculate trend
    data.each do |data_item|
      diff = data_item[:rank_year] - data_item[:rank_now]
      trend = 0

      if diff == 0
        trend = 0
      elsif diff == 1
        trend = 1
      elsif diff > 1
        trend = 2
      elsif diff == -1
        trend = -1
      elsif diff < -1
        trend = -2
      end

      data_item[:trend] = trend
    end

    #Save
    trends = []
    data.each do |data_item|
      puts data_item
      trends << Trend.new(category_id:category_id, item_id:data_item[:item_id], trend:data_item[:trend], score:data_item[:score], rank:data_item[:rank_now], rank_year:data_item[:rank_year])
    end

    Trend.import trends
  end

  def self.save_sum(trend_details, category_id, date, hsh_sum)
    hsh_sum.each do |item_id, score|
      next if category_id.nil?
      next if item_id.nil?
      next if date.nil?
      trend_details << TrendDetail.new(category_id:category_id, item_id:item_id, date:date, score:score)
    end
  end

  def self.download_trends(category)
    # url = "http://www.wikipediatrends.com/csv.php?query[]=Apache+Tomcat&query[]=IIS"
    url = 'http://www.wikipediatrends.com/csv.php?'
    url += category.items.map{|item| "query[]=#{URI::encode(item.name)}"}.join('&')
    content = open(url).read
    content
  end

end
