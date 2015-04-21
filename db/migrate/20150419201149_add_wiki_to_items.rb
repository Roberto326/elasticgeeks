class AddWikiToItems < ActiveRecord::Migration
  def change
    add_column :items, :wiki_id,  :string
    add_column :items, :wiki_name, :string
    add_column :items, :wiki_logo, :string
  end
end
