class Category < ActiveRecord::Base

  serialize :fields_def, Hash

  has_many :items

  default_scope -> {order('name ASC')}
end