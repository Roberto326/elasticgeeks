class AddRealTrend < ActiveRecord::Migration
  def change
    add_column :trends, :real_trend,  :integer
  end
end
