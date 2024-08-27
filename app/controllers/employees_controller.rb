class EmployeesController < ApplicationController
  def index
    @employees = current_user.company.employees
  end
end
