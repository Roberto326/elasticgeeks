class PlatformItem < ActiveRecord::Base

  belongs_to :platform
  belongs_to :item

end