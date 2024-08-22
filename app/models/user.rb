# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  enum role: [:employee, :admin]

  belongs_to :company
  accepts_nested_attributes_for :company

  def admin?
    user.role == :admin
  end

end
