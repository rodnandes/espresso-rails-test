FactoryBot.define do
  factory :card do
    last4 { "Cartão Teste" }
    user { nil }
  end
end
