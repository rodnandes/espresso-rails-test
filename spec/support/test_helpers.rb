# frozen_string_literal: true

module TestHelpers
  def formatted_statement(statement, fields)
    data = statement.as_json(include: %i[user category])
                    .merge('url' => api_v1_statement_url(statement, format: :json))

    fields.to_h { |field| [field, data.fetch(field, nil)] }
  end

  def formatted_admin_statement(statement, fields)
    statement.as_json(include: %i[user category])
             .merge('url' => api_v1_admin_statement_url(statement, format: :json))
             .slice(*fields)
  end
end
