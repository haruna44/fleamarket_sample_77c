class ApplicationController < ActionController::Base
  before_action :basic_auth, if: :production?
  before_action :authenticate_user!, except: [:index, :show]
  before_action :user_permitted_parameters, if: :devise_controller?

  private

  def basic_auth
    authenticate_or_request_with_http_basic do |username, password|
      username == Rails.application.credentials[:basic_auth][:user] &&
      password == Rails.application.credentials[:basic_auth][:pass]
    end
  end

  def user_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:nickname, :birthday, :last_name, :first_name, :last_name_kana, :first_name_kana, :image])
  end

  def production?
    Rails.env.production?
  end

  def set_category
    @category_parent_array = Category.where(ancestry: nil)
  end

end
