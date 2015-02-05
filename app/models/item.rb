class Item < ActiveRecord::Base

  belongs_to :category

  has_many :platforms, through: :platform_items
  has_many :platform_items

  has_many :licenses, through: :license_items
  has_many :license_items

  default_scope -> {order('name ASC')}

  def get_platforms
    platforms.map { |r| {id: r.id, text: r.name} }
  end

  def get_licenses
    licenses.map { |r| {id: r.id, text: r.name} }
  end

  def to_hash
    {
      id: self.id,
      name: self.name,
      category_id: self.category_id,
      website: self.website,
      platforms: self.get_platforms,
      licenses: self.get_licenses
    }
  end

end