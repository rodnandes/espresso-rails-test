# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    name { 'John Doe' }
    sequence(:email) { |n| "user#{n}@example.com" }
    password { 'password1234' }
    role { :employee }
    company { nil }
  end
end
