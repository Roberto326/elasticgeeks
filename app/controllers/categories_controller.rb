class CategoriesController < ApplicationController

  before_action :set_category, only: [:show, :update, :destroy, :show_popularity]
  before_filter :authenticate_user!, only: [:create, :update, :destroy]

  def index
    query = Category.where(parent_id: params[:context].presence)
    count = query.count
    results = query
    render json: {count:count, results:results}
  end

  def index_all
    query = Category.order(:parent_id, :name)
    count = query.count
    results = query
    render json: {count:count, results:results}
  end

  def show
    render json: {success:true, record:@category}
  end

  def show_popularity

    render json: @category.items.map {|item| {name:item.name, data: item.trend_details.where('date >= ?',Date.new(2011,1,1)).map{|td| [td.date.to_time.utc, td.score] } }},
           height:'500px',
           library: {curvType: 'function', fontName:'Lato', pointSize:0}
  end

  def create
    if @category = Category.create(post_params)
      render json: {success:true, record:@category}
    else
      render json: {success:false, errors:@category.errors}, status: :unprocessable_entity
    end
  end

  def update
    if @category.update_attributes(post_params)
      render json: {success:true, record:@category}
    else
      render json: {success:false, record:@category}, status: :unprocessable_entity
    end
  end

  def destroy
    if @category.destroy
      render json: {success:true, record:@category}
    else
      render json: {success:false, record:@category}, status: :unprocessable_entity
    end
  end

  private

  def set_category
    @category = Category.find(params[:id])
  end

  def post_params
    params[:category].permit!
  end

end
