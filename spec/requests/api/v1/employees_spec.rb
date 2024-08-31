# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Employees' do
  let!(:company) { create(:company) }
  let!(:admin) { create(:user, role: :admin, company: company) }
  let!(:employees) { create_list(:user, 3, company: company) }
  let!(:another_company_employees) { create_list(:user, 2, company: create(:company)) }
  let(:json_body) { response.parsed_body }

  describe 'GET /api/v1/employees' do
    context 'when authenticated user has role admin' do
      before do
        sign_in admin
        get api_v1_employees_url, as: :json
      end

      it 'returns a successful response' do
        expect(response).to be_successful
      end

      it "displays the company's employees list" do
        expect(json_body.pluck('id', 'name', 'email')).to match_array(employees.pluck(:id, :name, :email))
      end

      it 'does not return employees from other companies' do
        expect(json_body.pluck(:id)).not_to include(another_company_employees.pluck(:id))
      end
    end

    context 'when authenticated user has role employee' do
      before do
        sign_in employees.first
        get api_v1_employees_url, as: :json
      end

      it 'returns not allowed error message' do
        expect(response).to be_forbidden
      end

      it 'displays not allowed error message' do
        expect(json_body['error']).to eq('You are not allowed to perform this action.')
      end
    end

    context 'when unauthenticated user' do
      before do
        get api_v1_employees_url, as: :json
      end

      it 'returns not authorized response' do
        expect(response).to be_unauthorized
      end

      it 'displays not authorized error message' do
        expect(json_body['error']).to eq('You need to sign in or sign up before continuing.')
      end
    end
  end

  describe 'GET /api/v1/employees/:id' do
    context 'when authenticated user has role admin' do
      before do
        sign_in admin
      end

      it 'returns a successful response' do
        get api_v1_employee_url(employees.first), as: :json

        expect(response).to be_successful
      end

      it 'renders the response with one employee data with a given id' do
        get api_v1_employee_url(employees.first), as: :json

        expect(
          json_body.fetch_values('id', 'name', 'email')
        ).to eq(employees.first.attributes.fetch_values('id', 'name', 'email'))
      end

      it 'returns response status 404 when employee is not found' do
        get api_v1_employee_url(123_456), as: :json

        expect(response).to be_not_found
      end

      it 'renders error message when employee is not found' do
        get api_v1_employee_url(123_456), as: :json

        expect(json_body['error']).to eq('Record not found.')
      end
    end

    context 'when authenticated user has role employee' do
      it 'returns forbidden response status' do
        sign_in employees.first
        get api_v1_employee_url(employees.first), as: :json

        expect(response).to be_forbidden
      end

      it 'renders not allowed error message' do
        sign_in employees.first
        get api_v1_employee_url(employees.first), as: :json

        expect(json_body['error']).to eq('You are not allowed to perform this action.')
      end
    end

    context 'when unauthenticated user' do
      it 'returns not authorized response status' do
        get api_v1_employee_url(employees.first), as: :json

        expect(response).to be_unauthorized
      end

      it 'returns not authorized error message' do
        get api_v1_employee_url(employees.first), as: :json

        expect(json_body['error']).to eq('You need to sign in or sign up before continuing.')
      end
    end
  end

  describe 'POST /api/v1/employees' do
    context 'when authenticated user has role admin' do
      before { sign_in admin }

      it 'creates a new employee user' do
        expect do
          post api_v1_employees_url, params: { user: attributes_for(:user) }, as: :json
        end.to change(User, :count).by(1)
      end

      it 'returns created response status' do
        post api_v1_employees_url, params: { user: attributes_for(:user) }, as: :json

        expect(response).to have_http_status(:created)
      end

      it 'renders a JSON response with the new user' do
        post api_v1_employees_url, params: { user: attributes_for(:user) }, as: :json

        expect(
          json_body.fetch_values('name', 'email')
        ).to eq(request.params[:user].fetch_values(:name, :email))
      end

      it 'does not create a new employee user with invalid parameters' do
        expect do
          post api_v1_employees_url, params: { user: attributes_for(:user, email: 'invalid-email') }, as: :json
        end.not_to change(User, :count)
      end

      it 'renders a JSON response with errors for the invalid user' do
        post api_v1_employees_url, params: { user: attributes_for(:user, email: 'invalid-email') }, as: :json

        expect(response).to have_http_status(:unprocessable_entity)
      end
    end

    context 'when authenticated user has role employee' do
      it 'cannot create a new employee User' do
        sign_in employees.first
        post api_v1_employees_url, params: { user: attributes_for(:user) }, as: :json

        expect(response).to be_forbidden
      end

      it 'renders not allowed error message' do
        sign_in employees.first
        post api_v1_employees_url, params: { user: attributes_for(:user) }, as: :json

        expect(json_body['error']).to eq('You are not allowed to perform this action.')
      end
    end

    context 'when unauthenticated user' do
      it 'returns not authorized response status' do
        post api_v1_employees_url, params: { user: attributes_for(:user) }, as: :json

        expect(response).to be_unauthorized
      end

      it 'renders not authorized error message' do
        post api_v1_employees_url, params: { user: attributes_for(:user) }, as: :json

        expect(json_body['error']).to eq('You need to sign in or sign up before continuing.')
      end
    end
  end

  describe 'PATCH /api/v1/employees/:id' do
    context 'when authenticated user has role admin' do
      before do
        sign_in admin
        patch api_v1_employee_url(employees.last),
              params: { user: attributes_for(:user, name: 'Updated User Name') }, as: :json
      end

      it 'updates the requested user and return successful status' do
        expect(response).to have_http_status(:ok)
      end

      it 'updates the requested user and displays updated data' do
        expect(json_body['name']).to eq('Updated User Name')
      end

      it 'does not updates the user when invalid parameters is provided' do
        patch api_v1_employee_url(employees.last), params: { user: attributes_for(:user, email: 'invalid-email') },
                                                   as: :json

        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'returns not found error when employee does not exist' do
        patch api_v1_employee_url(123_456), params: { user: attributes_for(:user, name: 'Updated User Name') },
                                            as: :json

        expect(response).to be_not_found
      end

      it 'renders not found error message when employee does not exist' do
        patch api_v1_employee_url(123_456), params: { user: attributes_for(:user, name: 'Updated User Name') },
                                            as: :json

        expect(json_body['error']).to eq('Record not found.')
      end
    end

    context 'when authenticated user has role employee' do
      before do
        sign_in employees.first
        patch api_v1_employee_url(employees.last), params: { user: attributes_for(:user, name: 'Updated User Name') },
                                                   as: :json
      end

      it 'cannot create a new employee User' do
        expect(response).to be_forbidden
      end

      it 'renders not allowed message error' do
        expect(json_body['error']).to eq('You are not allowed to perform this action.')
      end
    end

    context 'when unauthenticated user' do
      before do
        patch api_v1_employee_url(employees.last), params: { user: attributes_for(:user, name: 'Updated User Name') },
                                                   as: :json
      end

      it 'returns not authorized response status' do
        expect(response).to be_unauthorized
      end

      it 'renders not authorized error message' do
        expect(json_body['error']).to eq('You need to sign in or sign up before continuing.')
      end
    end
  end

  describe 'DELETE /api/v1/employees/:id' do
    context 'when authenticated user has role admin' do
      before do
        sign_in admin
        delete api_v1_employee_url(employees.last), as: :json
      end

      it 'destroys the requested user' do
        expect(User.exists?(employees.last.id)).to be false
      end

      it 'returns no content response status' do
        expect(response).to have_http_status(:no_content)
      end

      it 'returns 404 response status when employee is not found' do
        delete api_v1_employee_url(123_456), as: :json

        expect(response).to be_not_found
      end

      it 'renders error message when employee is not found' do
        delete api_v1_employee_url(123_456), as: :json

        expect(json_body['error']).to eq('Record not found.')
      end
    end

    context 'when authenticated user has role employee' do
      before do
        sign_in employees.first
        delete api_v1_employee_url(employees.last), as: :json
      end

      it 'does not destroys the requested user' do
        expect(User.exists?(employees.last.id)).to be true
      end

      it 'returns response status forbidden' do
        expect(response).to be_forbidden
      end

      it 'renders not allowed error message' do
        expect(json_body['error']).to eq('You are not allowed to perform this action.')
      end
    end

    context 'when unauthenticated user' do
      before do
        delete api_v1_employee_url(employees.last), as: :json
      end

      it 'returns not authorized response status' do
        expect(response).to be_unauthorized
      end

      it 'renders not authorized error message' do
        expect(json_body['error']).to eq('You need to sign in or sign up before continuing.')
      end
    end
  end
end
