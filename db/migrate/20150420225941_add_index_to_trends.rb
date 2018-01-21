class AddIndexToTrends < ActiveRecord::Migration
  def change
    add_index :trends, [:category_id]
    add_index :trends, [:item_id]

    add_index :trend_details, [:category_id]
    add_index :trend_details, [:item_id]
    add_index :trend_details, [:date]
  end
end
