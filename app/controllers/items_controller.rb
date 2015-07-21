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

  def search
    search_term = URI.decode(params[:search])
    sql = <<SQL
      SELECT
        match(s.name,s.description,s.wiki_name) against('#{search_term}*' IN BOOLEAN MODE) score,
        s.name, s.rec_type, s.rec_id,
        i.id as 'item_id',
        ic1.id as 'category_1_id',
        ic1.name as 'category_1_name',
        ic1.description as 'category_1_description',
        ic2.id as 'category_2_id',
        ic2.name as 'category_2_name',
        ic2.description as 'category_2_description',
        pc.id as 'parent_category_id',
        pc.name as 'parent_category_name',
        pc.description as 'parent_category_description'
      FROM searches s
      LEFT JOIN categories c on c.id = s.rec_id and s.rec_type = 'Category'
      LEFT JOIN items i on i.id = s.rec_id and s.rec_type = 'Item'
      LEFT JOIN categories ic1 on ic1.id = i.category_id
      LEFT JOIN categories ic2 on ic2.id = ic1.parent_id
      LEFT JOIN categories pc  on pc.id = c.parent_id
      WHERE match(s.name,s.description,s.wiki_name) against('#{search_term}*' IN BOOLEAN MODE)
SQL

    query = Search.connection.execute(sql)
    count = query.count
    results = []
    query.each do |rec|
      results << {
        name:                   rec[ 1],
        type:                   rec[ 2],
        id:                     rec[ 3],
        item_id:                rec[ 4],
        category_1_id:          rec[ 5] || rec[11],
        category_1_name:        rec[ 6] || rec[12],
        category_1_description: rec[ 7] || rec[13],
        category_2_id:          rec[ 8],
        category_2_name:        rec[ 9],
        category_2_description: rec[10]
      }
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
