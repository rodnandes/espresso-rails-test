# frozen_string_literal: true

class ApplicationController < ActionController::Base
  before_action :authenticate_user!
  before_action :authorize_user, unless: :devise_controller?
  rescue_from ActiveRecord::RecordNotFound, with: :not_found

  protected

  def authorize_user
    return if allowed?

    render json: { error: 'You are not allowed to perform this action.' }, status: :forbidden
  end

  def not_found
    render json: { error: 'Record not found.' }, status: :not_found
  end

  def allowed?
    current_user&.admin?
  end
end
