# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Statements' do
  let!(:company) { create(:company) }
  let!(:employee) { create(:user, name: 'Employee 1', role: :employee, company: company) }
  let!(:other_employee) { create(:user, name: 'Employee 2', role: :employee, company: company) }
  let!(:employee_statements) do
    create_list(:statement, 5, category: create(:category, company: company), user: employee)
  end
  let!(:other_employee_statements) do
    create_list(:statement, 5, category: create(:category, company: company), user: other_employee)
  end
  let!(:category) { create(:category, company: company) }

  fields = %w[id merchant cost transaction_id performed_at created_at user category url]

  describe 'GET /api/v1/statements' do
    context 'when employee user is authenticated' do
      before do
        sign_in employee
        get api_v1_statements_url, as: :json
      end

      it 'returns a successful response status' do
        expect(response).to be_successful
      end

      it 'renders a JSON reponse with current user statements' do
        expected_data = employee_statements.map do |statement|
          formatted_statement(statement, fields)
        end

        expect(response.body).to eq(expected_data.to_json)
      end
    end

    context 'when not authenticated' do
      before do
        get api_v1_statements_url, as: :json
      end

      it 'returns not authorized response' do
        expect(response).to be_unauthorized
      end

      it 'displays not authorized error message' do
        expect(response.parsed_body['error']).to eq('You need to sign in or sign up before continuing.')
      end
    end
  end

  describe 'GET /api/v1/statements/:id' do
    context 'when employee user is authenticated' do
      before do
        sign_in employee
        get api_v1_statement_url(employee_statements.first), as: :json
      end

      it 'returns a successful response status' do
        expect(response).to be_successful
      end

      it 'renders a JSON reponse with the current user statement data' do
        expected_data = formatted_statement(employee_statements.first, fields)

        expect(response.body).to eq(expected_data.to_json)
      end
    end

    context 'when authenticated user tries to access another user statement' do
      before do
        sign_in employee
        get api_v1_statement_url(other_employee_statements.sample), as: :json
      end

      it 'returns not allowed error message' do
        expect(response).to be_not_found
      end

      it 'displays not found error message' do
        expect(response.parsed_body['error']).to eq('Record not found.')
      end
    end

    context 'when not authenticated' do
      before do
        get api_v1_statement_url(employee_statements.first), as: :json
      end

      it 'returns not authorized response' do
        expect(response).to be_unauthorized
      end

      it 'displays not authorized error message' do
        expect(response.parsed_body['error']).to eq('You need to sign in or sign up before continuing.')
      end
    end
  end

  describe 'POST /api/v1/statements' do
    context 'when authenticated user has roleemployee' do
      let(:statements) { Statement.all }

      before do
        sign_in employee
        post api_v1_statements_url,
             params: {
               statement: attributes_for(:statement, merchant: 'new merchant', category_id: category.id)
             }, as: :json
      end

      it 'creates a new Statement' do
        expect do
          post api_v1_statements_url,
               params: { statement: attributes_for(:statement, category_id: category.id) }, as: :json
        end.to change(Statement, :count).by(1)
      end

      it 'returns a successful response status' do
        expect(response).to be_successful
      end

      it 'renders a JSON reponse with correct statements data' do
        expected_data = formatted_statement(statements.last, fields)

        expect(response.body).to eq(expected_data.to_json)
      end

      it 'returns unsuccessful response status when invalid params' do
        post api_v1_statements_url, params: { statement: attributes_for(:statement) }, as: :json

        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'renders a JSON reponse with invalid param message' do
        post api_v1_statements_url, params: { statement: attributes_for(:statement) }, as: :json

        expect(response.parsed_body['errors']).not_to be_empty
      end

      it 'does not creates a new Statement' do
        expect do
          post api_v1_statements_url, params: { statement: attributes_for(:statement) }, as: :json
        end.not_to change(Statement, :count)
      end
    end

    context 'when not authenticated' do
      before do
        post api_v1_statements_url,
             params: {
               statement: attributes_for(:statement), category: attributes_for(:category), user: employee
             }, as: :json
      end

      it 'returns not authorized response' do
        expect(response).to be_unauthorized
      end

      it 'displays not authorized error message' do
        expect(response.parsed_body['error']).to eq('You need to sign in or sign up before continuing.')
      end
    end
  end

  describe 'PATCH /api/v1/statements/:id' do
    context 'when authenticated user has role admin' do
      before do
        sign_in employee
        patch api_v1_statement_url(employee_statements.last),
              params: { statement: { merchant: 'Teste 123' } }, as: :json
      end

      it 'updates the requested statement and return successful status' do
        expect(response).to have_http_status(:ok)
      end

      it 'renders a JSON reponse with updated statement' do
        expected_data = formatted_statement(employee_statements.last, fields)
        expected_data['merchant'] = 'Teste 123'

        expect(response.body).to eq(expected_data.to_json)
      end

      it 'returns not found status when statement does not exist' do
        patch api_v1_statement_url(123_456),
              params: { statement: { merchant: 'Teste 123' } }, as: :json

        expect(response).to be_not_found
      end

      it 'returns not found error message when statement does not exist' do
        patch api_v1_statement_url(123_456),
              params: { statement: { merchant: 'Teste 123' } }, as: :json

        expect(response.parsed_body['error']).to eq('Record not found.')
      end
    end

    context 'when not authenticated' do
      before do
        patch api_v1_statement_url(employee_statements.last),
              params: { statement: { merchant: 'Teste 123' } }, as: :json
      end

      it 'returns not authorized response status' do
        expect(response).to be_unauthorized
      end

      it 'renders not authorized error message' do
        expect(response.parsed_body['error']).to eq('You need to sign in or sign up before continuing.')
      end
    end
  end

  describe 'DELETE /api/v1/admin/statements/:id' do
    context 'when employee user is authenticated' do
      before do
        sign_in employee
        delete api_v1_statement_url(employee_statements.last), as: :json
      end

      it 'destroys the requested statement' do
        expect(Statement.exists?(employee_statements.last.id)).to be false
      end
    end

    context 'when not authenticated' do
      before do
        delete api_v1_statement_url(employee_statements.last), as: :json
      end

      it 'returns not authorized response status' do
        expect(response).to be_unauthorized
      end

      it 'renders not authorized error message' do
        expect(response.parsed_body['error']).to eq('You need to sign in or sign up before continuing.')
      end
    end
  end
end
