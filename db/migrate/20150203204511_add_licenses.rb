class AddLicenses < ActiveRecord::Migration
  def up
    License.create(id:1, name:'GPL')
    License.create(id:2, name:'Apache')
    License.create(id:3, name:'MIT')
    License.create(id:4, name:'LGPL')
    License.create(id:5, name:'Proprietary')
  end
  def down
  end
end
