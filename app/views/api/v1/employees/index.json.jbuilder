# frozen_string_literal: true

json.array! @employees, partial: 'api/v1/employees/employee', as: :employee
