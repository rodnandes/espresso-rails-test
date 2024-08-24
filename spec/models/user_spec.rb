# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User do
  subject(:user) { build(:user, company: company) }
  let(:company) { build(:company) }

  it { is_expected.to be_valid }
  it { is_expected.to accept_nested_attributes_for(:company) }

  context 'without a company' do
    let(:company) { nil }
    it { is_expected.not_to be_valid }
  end

  describe '#admin?' do
    let(:default_role) { 'employee' }
    let(:admin_user) { build(:user, role: 'admin') }
    let(:employee_user) { build(:user) }

    it 'returns true when user is an admin' do
      expect(employee_user).not_to be_admin
      expect(admin_user).to be_admin
    end

    context 'when role is not explicitly set' do
      let(:role) { nil }
      it "can't be admin and must be default value" do
        expect(employee_user).not_to be_admin
        expect(employee_user.role).to eq(default_role)
      end
    end
  end

  describe '#company_attributes=' do
    context 'with a new company attributes' do
      let(:user_with_company_attrs) { build(:user, company_attributes: { name: 'test', cnpj: '1234' }) }

      it 'associate a new company to user' do
        expect(user_with_company_attrs.company).to be_an_instance_of(Company)
        expect(user_with_company_attrs.company).to be_valid
        expect(user_with_company_attrs.company.name).to eq 'test'
        expect(user_with_company_attrs.company.cnpj).to eq '1234'
      end

      it 'created as company admin' do
        expect(user_with_company_attrs).to be_admin
      end
    end

    context 'user with an existing company attributes' do
      let(:user_with_company_attrs) { build(:user, company_attributes: { name: company.name, cnpj: company.cnpj }) }

      it 'associate an existing company to user' do
        expect(user_with_company_attrs.company).to be_an_instance_of(Company)
        expect(user_with_company_attrs.company).to be_valid
        expect(user_with_company_attrs.company.name).to eq company.name
        expect(user_with_company_attrs.company.cnpj).to eq company.cnpj
      end

      it 'created as company admin' do
        expect(user_with_company_attrs).to be_admin
      end
    end
  end
end
