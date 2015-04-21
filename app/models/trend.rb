class Trend < ActiveRecord::Base

  serialize :trend, Hash

  belongs_to :category
  belongs_to :item

end
