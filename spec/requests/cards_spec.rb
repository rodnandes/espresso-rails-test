# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Cards' do
  describe 'GET /cartoes' do
    let!(:company) { create(:company) }
    let!(:admin) { create(:user, role: :admin, company: company) }

    it 'returns http success' do
      sign_in admin

      get '/cartoes'
      # expect(response).to have_http_status(:success)
      expect(response).to be_successful
    end
  end
end
