class IndexController < ApplicationController

  layout 'standard'

  def show
    p1 = params[:p1].to_s.titleize
    p2 = params[:p2].to_s.titleize
    p3 = params[:p3].to_s.titleize

    @root       = Category.find(1)
    @category_1 = Category.find(2)
    @category_2 = Category.find(3)
    @category_3 = Category.find(4)

    @category = nil
    @category = Category.find_by_name(p1) if p1.present?
    @category = @category.sub_categories.find_by_name(p2) if p2.present?
    @category = @category.sub_categories.find_by_name(p3) if p3.present?

    if @category

      query = Item.where(category_id: @category.id).includes(:trends).order('trends.rank asc')
      @items = query.map do |r|
        t = r.trends.first
        if t
          r.to_hash.merge!(trend: t.trend, rank: t.rank, rank_year: t.rank_year).with_indifferent_access
        else
          r.to_hash.merge!(trend: 0, rank: 0, rank_year: 0).with_indifferent_access
        end
      end

      puts @items

    else
      raise ActionController::RoutingError.new('Not Found')
    end

  end

  private


end
