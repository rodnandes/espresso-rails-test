# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Categories' do
  describe 'GET /categorias' do
    let!(:company) { create(:company) }
    let!(:admin) { create(:user, role: :admin, company: company) }

    it 'returns http success' do
      sign_in admin

      get '/categorias'
      expect(response).to have_http_status(:success)
    end
  end
end
