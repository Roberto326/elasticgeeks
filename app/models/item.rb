class Item < ActiveRecord::Base

  serialize :fields, Hash

  belongs_to :category

  has_many :platforms, through: :platform_items
  has_many :platform_items

  has_many :licenses, through: :license_items
  has_many :license_items

  has_many :trends
  has_many :trend_details

  # default_scope -> {order('name ASC')}
  default_scope -> {where(disabled:false)}


  def get_platforms
    platforms.map { |r| {id: r.id, text: r.name} }
  end

  def get_licenses
    licenses.map { |r| {id: r.id, text: r.name} }
  end

  def to_hash
    self.attributes.merge({
      platforms: self.get_platforms,
      licenses: self.get_licenses
    })
  end

end