class License < ActiveRecord::Base

  has_many :items, through: :license_items
  has_many :license_items

end