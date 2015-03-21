class Category < ActiveRecord::Base

  serialize :fields_def, Hash

  has_many :sub_categories, class_name: 'Category', foreign_key:'parent_id'
  has_many :items

  default_scope -> {order('name ASC')}
end
