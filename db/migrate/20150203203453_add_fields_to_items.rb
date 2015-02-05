class AddFieldsToItems < ActiveRecord::Migration
  def change
    add_column :items, :website,  :string, :null => false
  end
end
