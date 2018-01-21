class LicensesController < ApplicationController

  before_action :set_license, only: [:show, :update, :destroy]
  before_filter :authenticate_user!, only: [:create, :update, :destroy]

  def index
    query = License.all
    count = query.count
    results = query
    render json: {count:count, results:results}
  end

  def show
    render json: {success:true, record:@license}
  end

  def create
    if @license = License.create(post_params)
      render json: {success:true, record:@license}
    else
      render json: {success:false, errors:@license.errors}, status: :unprocessable_entity
    end
  end

  def update
    if @license.update_attributes(post_params)
      render json: {success:true, record:@license}
    else
      render json: {success:false, record:@license}, status: :unprocessable_entity
    end
  end

  def destroy
    if @license.destroy
      render json: {success:true, record:@license}
    else
      render json: {success:false, record:@license}, status: :unprocessable_entity
    end
  end

  private

  def set_license
    @license = License.find(params[:id])
  end

  def post_params
    pp = params[:license].permit!
    pp.delete(:text)
    pp
  end

end
