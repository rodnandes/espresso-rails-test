# frozen_string_literal: true

json.array! @statements, partial: 'api/v1/admin/statements/statement', as: :statement
