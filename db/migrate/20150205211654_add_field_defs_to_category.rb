class AddFieldDefsToCategory < ActiveRecord::Migration
  def change
    add_column :categories, :fields_def,  :text
  end
end
