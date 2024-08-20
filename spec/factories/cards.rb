# frozen_string_literal: true

FactoryBot.define do
  factory :card do
    last4 { '1234' }
    user { nil }
  end
end
