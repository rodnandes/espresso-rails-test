# frozen_string_literal: true

class ApplicationController < ActionController::Base
  before_action :authenticate_user!
  before_action :authorize
  rescue_from ActiveRecord::RecordNotFound, with: :not_found

  protected

  def authorize
    return unless !current_user.nil? && !current_user.admin?

    render json: { error: 'You are not allowed to perform this action.' }, status: :forbidden
  end

  def not_found
    render json: { error: 'Record not found.' }, status: :not_found
  end
end
