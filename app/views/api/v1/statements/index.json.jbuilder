# frozen_string_literal: true

json.array! @statements, partial: 'api/v1/statements/statement', as: :statement
