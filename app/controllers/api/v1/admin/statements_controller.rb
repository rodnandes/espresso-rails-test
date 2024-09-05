# frozen_string_literal: true

module Api
  module V1
    module Admin
      class StatementsController < ApplicationController
        before_action :set_statement, only: %i[show update destroy]

        def index
          @statements = Statement.all
        end

        def show; end

        def create
          @statement = Statement.new(statement_params.merge({ user: current_user }))

          if @statement.save
            render :show, status: :created, location: api_v1_admin_statement_url(@statement)
          else
            render json: { errors: @statement.errors }, status: :unprocessable_entity
          end
        end

        def update
          if @statement.update(statement_params)
            render :show, status: :ok, location: api_v1_admin_statement_url(@statement)
          else
            render json: { errors: @statement.errors }, status: :unprocessable_entity
          end
        end

        def destroy
          @statement.destroy
        end

        private

        def set_statement
          @statement = Statement.find(params[:id])
        end

        def statement_params
          params.require(:statement).permit(:merchant, :cost, :performed_at, :transaction_id, :category_id)
        end
      end
    end
  end
end
