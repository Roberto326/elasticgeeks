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
    col_index = {}
    first = true
    date = nil
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

        if hsh_sum[item_id].blank?
          hsh_sum[item_id] = score
        else
          hsh_sum[item_id] += score
        end
      end

      # Last day of the month
      if date.month != date.next_day.month
        save_sum(trend_details, category.to_param, date, hsh_sum)
        hsh_sum = {}
      end
    end

    save_sum(trend_details, category.to_param, date, hsh_sum)

    TrendDetail.import trend_details
  end

  def self.save_sum(trend_details, category_id, date, hsh_sum)
    hsh_sum.each do |item_id, score|
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
