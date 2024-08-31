# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Registrations' do
  describe 'POST /users' do
    let(:user_params) do
      {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123',
        password_confirmation: 'password123',
        company_attributes: {
          name: 'Example Company',
          cnpj: '33.222.111/0050-46'
        }
      }
    end

    it 'creates a new user' do
      expect do
        post user_registration_url, params: { user: user_params }
      end.to change(User, :count).by(1)
    end
  end
end
