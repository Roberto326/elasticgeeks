class ItemsController < ApplicationController

  before_action :set_item, only: [:show, :update, :destroy]
  before_filter :authenticate_user!, only: [:create, :update, :destroy]

  def index
    query = Item.where(category_id: params[:context].presence)
    count = query.count
    results = query.joins('LEFT OUTER JOIN trends on trends.item_id = items.id').includes(:trends).order('ISNULL(items.wiki_name), trends.rank asc').map do |r|
      t = r.trends.first
      if t
        r.to_hash.merge!(trend: t.trend, rank: t.rank, rank_year: t.rank_year, real_trend: t.real_trend)
      else
        r.to_hash.merge!(trend: 'n/a', rank: 'n/a', rank_year: 'n/a', real_trend:'n/a')
      end
    end
    render json: {count:count, results:results}
  end

  def index_all
    query = Item.joins(:platforms, :licenses, :category).includes(:platforms, :licenses, :category).order('categories.name asc, items.name asc')
    count = query.count
    results = query.map do |r|
      c = r.category
      next if c.disabled
      if c
        r.to_hash.merge!(category_name:c.name)
      else
        r.to_hash
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

    pls = result.delete('platforms')
    @platforms = pls.map{|r| r['id']} if pls

    lls = result.delete('licenses')
    @licenses = lls.map{|r| r['id']} if lls

    result.delete('platform_names')
    result.delete('license_names')
    result.delete('trend')
    result.delete('real_trend')
    result.delete('rank')
    result.delete('rank_year')
    result.delete('category_name')

    result
  end

end
