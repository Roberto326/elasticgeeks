class AddIndexToWikiName < ActiveRecord::Migration
  def change
    add_index :items, [:wiki_id]
    add_index :items, [:wiki_name]
  end
end
