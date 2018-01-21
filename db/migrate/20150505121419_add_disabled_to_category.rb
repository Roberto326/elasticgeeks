class AddDisabledToCategory < ActiveRecord::Migration
  def change
    add_column :categories, :disabled,  :boolean, :default => false
    add_column :items, :disabled,  :boolean, :default => false
  end
end
