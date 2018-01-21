class AddRankToTrend < ActiveRecord::Migration
  def change

    remove_column :trends, :current_popularity
    remove_column :trends, :trend

    add_column :trends, :trend,  :integer
    add_column :trends, :score,  :integer
    add_column :trends, :rank,  :integer
    add_column :trends, :rank_year,  :integer

    add_index :trends, [:rank]
  end
end
