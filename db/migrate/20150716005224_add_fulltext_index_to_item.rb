class AddFulltextIndexToItem < ActiveRecord::Migration
  def change
    add_index :items, [:name,:description,:wiki_name], name: 'items_fulltext', type: :fulltext
  end
end
