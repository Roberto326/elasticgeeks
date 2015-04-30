class ItemsController < ApplicationController

  before_action :set_item, only: [:show, :update, :destroy]
  before_filter :authenticate_user!, only: [:create, :update, :destroy]

  def index
    query = Item.where(category_id: params[:context].presence).includes(:trends).order('trends.rank asc')
    count = query.count
    results = query.map do |r|
      t = r.trends.first
      if t
        r.to_hash.merge(trend: t.trend, rank: t.rank, rank_year: t.rank_year)
      else
        r.to_hash.merge(trend: 0, rank: 0, rank_year: 0)
      end
    end
    render json: {count:count, results:results}
  end

  def show
    render json: {success:true, record:@item}
  end

  def create
    if @item = Item.create(post_params)
      render json: {success:true, record:@item}
    else
      render json: {success:false, errors:@item.errors}, status: :unprocessable_entity
    end
  end

  def update
    if @item.update_attributes(post_params)
      @item.platform_ids = @platforms
      @item.license_ids  = @licenses
      render json: {success:true, record:@item}
    else
      render json: {success:false, record:@item}, status: :unprocessable_entity
    end
  end

  def destroy
    if @item.destroy
      render json: {success:true, record:@item}
    else
      render json: {success:false, record:@item}, status: :unprocessable_entity
    end
  end

  private

  def set_item
    @item = Item.find(params[:id])
  end

  def post_params
    result = params[:item].permit!

    @platforms = result.delete('platforms').map{|r| r['id']}
    @licenses  = result.delete('licenses').map{|r| r['id']}
    result.delete('platform_names')
    result.delete('license_names')

    result
  end

end
