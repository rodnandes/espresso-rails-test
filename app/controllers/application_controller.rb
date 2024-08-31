# frozen_string_literal: true

class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :authenticate_user!
  before_action :authorized?
  rescue_from ActiveRecord::RecordNotFound, with: :not_found

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name, { company_attributes: %i[name cnpj] }])
  end

  def authorized?
    return false if current_user.admin?

    render json: { error: 'You are not allowed to perform this action.' }, status: :forbidden
  end

  def not_found
    render json: { error: 'Record not found.' }, status: :not_found
  end
end
