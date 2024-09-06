# frozen_string_literal: true

json.extract! statement, :id, :merchant, :cost, :transaction_id, :performed_at, :created_at, :user, :category
json.url api_v1_statement_url(statement, format: :json)
