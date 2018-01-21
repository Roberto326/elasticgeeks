class CreatePlatforms < ActiveRecord::Migration
  def change
    create_table :platforms do |t|
      t.string  :name,              null: false
      t.text    :description

      t.timestamps
    end

    create_table :platform_items do |t|
      t.integer :platform_id, null: false
      t.integer :item_id, null: false
    end
  end
end
