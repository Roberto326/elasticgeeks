class AddSearchTable < ActiveRecord::Migration
  def change
    create_table :searches do |t|
      t.string  :rec_type
      t.integer :rec_id
      t.string :name
      t.text :description
      t.string :wiki_name
    end

    add_index :searches, [:name,:description,:wiki_name], name: 'search_fulltext', type: :fulltext


    Search.reindex
  end
end
