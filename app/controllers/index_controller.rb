class IndexController < ApplicationController

  layout 'standard'

  def show
    p1 = params[:p1].to_s.titleize
    p2 = params[:p2].to_s.titleize
    p3 = params[:p3].to_s.titleize

    @category = nil
    @category = Category.find_by_name(p1) if p1.present?
    @category = @category.sub_categories.find_by_name(p2) if p2.present?
    @category = @category.sub_categories.find_by_name(p3) if p3.present?

    if @category

      @title = @category.name

    else
      raise ActionController::RoutingError.new('Not Found')
    end

  end

  private


end
