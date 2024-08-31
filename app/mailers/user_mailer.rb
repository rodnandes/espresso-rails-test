# frozen_string_literal: true

class UserMailer < ApplicationMailer
  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.user_mailer.send_password.subject
  #
  def send_password(user, password)
    @greeting = 'Olá'
    @password = password

    mail to: user.email
  end
end
