class AddWikiToCategories < ActiveRecord::Migration
  def change
    add_column :categories, :wiki_id,  :string
    add_column :categories, :wiki_name, :string
  end
end
