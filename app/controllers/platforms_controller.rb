class PlatformsController < ApplicationController

  before_action :set_platform, only: [:show, :update, :destroy]
  before_filter :authenticate_user!, only: [:create, :update, :destroy]

  def index
    query = Platform.all
    count = query.count
    results = query
    render json: {count:count, results:results}
  end

  def show
    render json: {success:true, record:@platform}
  end

  def create
    if @platform = Platform.create(post_params)
      render json: {success:true, record:@platform}
    else
      render json: {success:false, errors:@platform.errors}, status: :unprocessable_entity
    end
  end

  def update
    if @platform.update_attributes(post_params)
      render json: {success:true, record:@platform}
    else
      render json: {success:false, record:@platform}, status: :unprocessable_entity
    end
  end

  def destroy
    if @platform.destroy
      render json: {success:true, record:@platform}
    else
      render json: {success:false, record:@platform}, status: :unprocessable_entity
    end
  end

  private

  def set_platform
    @platform = Platform.find(params[:id])
  end

  def post_params
    params[:platform].permit!
  end

end
