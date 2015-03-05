class CategoriesController < ApplicationController

  before_action :set_category, only: [:show, :update, :destroy]
  before_filter :authenticate_user!, only: [:create, :update, :destroy]

  def index
    query = Category.where(parent_id: params[:context].presence)
    count = query.count
    results = query
    render json: {count:count, results:results}
  end

  def show
    render json: {success:true, record:@category}
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
