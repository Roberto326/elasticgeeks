class CreateLicenses < ActiveRecord::Migration
  def change
    create_table :licenses do |t|
      t.string  :name,              null: false
      t.text    :description

      t.timestamps
    end

    create_table :license_items do |t|
      t.integer :license_id, null: false
      t.integer :item_id, null: false
    end
  end
end
