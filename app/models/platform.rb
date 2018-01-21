class Platform < ActiveRecord::Base

  has_many :items, through: :platform_items
  has_many :platform_items

end