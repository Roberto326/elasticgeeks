class DisableCategories < ActiveRecord::Migration
  def change
    Category.unscoped.find(1).update_attribute(:disabled, true)

    Category.unscoped.where(parent_id:1).each {|c| c.update_attribute(:disabled, true)}
  end
end
