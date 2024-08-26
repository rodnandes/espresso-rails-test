class EmployeesController < ApplicationController
  def index
    @employees = current_user.company.users
  end
end
