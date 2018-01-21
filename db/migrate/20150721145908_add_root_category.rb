class AddRootCategory < ActiveRecord::Migration
  def change

    Category.transaction do

      change_category(3,4)
      change_category(2,3)
      change_category(1,2)

      cat = Category.create(id:1, name:'/', description:'The Big Bang')

      Category.find(2).update_attribute(:parent_id, 1)
      Category.find(3).update_attribute(:parent_id, 1)
      Category.find(4).update_attribute(:parent_id, 1)

    end

  end

  def change_category(from, to)
    cat = Category.find(from)
    cat.id = to;
    cat.save!

    Category.where(parent_id:from).update_all(parent_id:to)
    Item.where(category_id:from).update_all(category_id:to)
  end
end
