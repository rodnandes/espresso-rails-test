# frozen_string_literal: true

class Statement < ApplicationRecord
  belongs_to :category, optional: true
  belongs_to :user

  validates :cost, numericality: { greater_than: 0 }
  validates :merchant, presence: true
  validates :transaction_id, presence: true
end
