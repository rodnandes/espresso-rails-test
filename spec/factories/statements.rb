FactoryBot.define do
  factory :statement do
    performed_at { Time.zone.now }
    cost { 123.45 }
    merchant { "Merchant Name" }
    transaction_id { "1234abcde" }
    category { nil }
    user { nil }
  end
end
