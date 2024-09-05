# frozen_string_literal: true

module TestHelpers
  def formatted_statement(statement)
    statement.as_json(include: %i[user category])
             .merge('url' => api_v1_admin_statement_url(statement, format: :json))
             .slice('id', 'merchant', 'cost', 'transaction_id', 'performed_at', 'created_at', 'user', 'category', 'url')
  end
end
