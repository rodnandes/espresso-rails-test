# frozen_string_literal: true

class Company < ApplicationRecord
  has_many :users

  def employees
    users.where(role: :employee)
  end
end
