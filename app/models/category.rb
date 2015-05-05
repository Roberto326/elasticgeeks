class Category < ActiveRecord::Base

  serialize :fields_def, Hash

  has_many :sub_categories, class_name: 'Category', foreign_key:'parent_id'
  has_many :items
  belongs_to :parent, class_name: 'Category', foreign_key: 'parent_id'

  default_scope -> {where(disabled:false)}
end
