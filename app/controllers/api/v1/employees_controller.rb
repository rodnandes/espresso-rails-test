class Api::V1::EmployeesController < ApplicationController
  before_action :set_user, only: %i[ show update destroy ]

  # GET /api/v1/employees.json
  def index
    @employees = current_user.company.employees
  end

  # GET /api/v1/employees/1.json
  def show
  end

  # POST /api/v1/employees.json
  def create
    @employee = User.new(user_params.merge(company: current_user.company))

    if @employee.save
      render :show, status: :created
    else
      render json: @employee.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/employees/1.json
  def update
    if @employee.update(user_params)
      render :show, status: :ok
    else
      render json: @employee.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/employees/1.json
  def destroy
    @employee.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @employee = User.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.fetch(:user).permit(:name, :email)
    end
end
