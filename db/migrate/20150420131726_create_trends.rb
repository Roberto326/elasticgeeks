class CreateTrends < ActiveRecord::Migration
  def change
    create_table :trends do |t|
      t.integer :category_id, null:false
      t.integer :item_id, null:false
      t.integer :current_popularity
      t.text :trend
    end

    add_index :trends, [:category_id, :item_id]

    create_table :trend_details do |t|
      t.integer :category_id, null:false
      t.integer :item_id, null:false
      t.date :date, null:false
      t.integer :score
    end

    add_index :trend_details, [:category_id, :item_id, :date]
  end
end
