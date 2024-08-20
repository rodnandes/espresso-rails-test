class EmployeesController < ApplicationController
  def index
    @employees = User.all
  end
end
