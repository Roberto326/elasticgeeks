class Search < ActiveRecord::Base

  def self.reindex
    self.transaction do
      self.destroy_all

      Item.all.each do |item|
        self.create(rec_type:item.class.name, rec_id:item.id, name:item.name, description:item.description, wiki_name:item.wiki_name)
      end

      Category.all.each do |category|
        self.create(rec_type:category.class.name, rec_id:category.id, name:category.name, description:category.description, wiki_name:category.wiki_name)
      end

    end
  end

end
