class AddInitialCategories < ActiveRecord::Migration
  def up
    Category.create(id:1, name:'Enterprise Applications')
    Category.create(id:2, name:'Programming Platforms')
    Category.create(id:3, name:'Development Tools')
  end

  def down
  end
end
