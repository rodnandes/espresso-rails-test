# frozen_string_literal: true

module TestHelpers
  def formatted_statement(statement, fields)
    statement.as_json(include: %i[user category])
             .merge('url' => api_v1_statement_url(statement, format: :json))
             .slice(*fields)
  end

  def formatted_admin_statement(statement, fields)
    statement.as_json(include: %i[user category])
             .merge('url' => api_v1_admin_statement_url(statement, format: :json))
             .slice(*fields)
  end
end
