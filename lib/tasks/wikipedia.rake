require 'process_trends'

task :wikipedia, [:category_id]  => :environment do |t,args|

  if args.category_id.present?
    ProcessTrends.trends_for_category(Category.find(args.category_id))
  else
    ProcessTrends.trends_for_parent()
  end


end
