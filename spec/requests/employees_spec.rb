# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Employees' do
  describe 'GET /funcionarios' do
    let!(:company) { create(:company) }
    let!(:admin) { create(:user, role: :admin, company: company) }

    it 'returns http success' do
      sign_in admin

      get '/funcionarios'
      expect(response).to have_http_status(:success)
    end
  end
end
