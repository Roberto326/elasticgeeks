class AddPlatforms < ActiveRecord::Migration
  def up
    Platform.create(id:1, name:'Windows')
    Platform.create(id:2, name:'Linux')
    Platform.create(id:3, name:'UNIX')
    Platform.create(id:4, name:'OS X')
  end
  def down
  end
end
