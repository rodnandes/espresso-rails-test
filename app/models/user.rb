# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  enum role: { employee: 0, admin: 1 }
  belongs_to :company
  accepts_nested_attributes_for :company

  after_create :send_password

  def company_attributes=(company_attributes)
    self.company = Company.find_by(cnpj: company_attributes[:cnpj])
    self.role = :admin

    return unless company.nil?

    build_company(company_attributes)
  end

  def admin?
    role == 'admin'
  end

  def password_required?
    return false if new_record? && !admin?

    super
  end

  def send_password
    return if admin?

    pass = SecureRandom.hex(6)
    update(password: pass)
    UserMailer.send_password(self, pass).deliver_now
  end
end
