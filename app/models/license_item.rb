class LicenseItem < ActiveRecord::Base

  belongs_to :license
  belongs_to :item

end