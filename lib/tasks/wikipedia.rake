require 'process_trends'

task :wikipedia => :environment do

  ProcessTrends.trends_for_parent()

end
