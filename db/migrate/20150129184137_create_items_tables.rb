class CreateItemsTables < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.string  :name,              null: false
      t.integer :category_id

      t.timestamps
    end
  end
end
