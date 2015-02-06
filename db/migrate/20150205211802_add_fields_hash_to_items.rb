class AddFieldsHashToItems < ActiveRecord::Migration
  def change
    add_column :items, :fields,  :text
  end
end
