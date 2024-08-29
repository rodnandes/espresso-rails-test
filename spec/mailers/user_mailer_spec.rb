require "rails_helper"

RSpec.describe UserMailer, type: :mailer do
  describe "send_password" do
    let(:password) { "password123" }
    let(:user) { build(:user) }
    let(:mail) { UserMailer.send_password(user, password) }
    let(:email_body_contents) { mail.body.parts.map {|part| part.body.encoded }.join }
    let(:text_content) { mail.body.parts.find { |p| p.content_type.match 'text/plain' }.body.raw_source }
    let(:html_content) { mail.body.parts.find { |p| p.content_type.match 'text/html' }.body.raw_source }


    it "has the correct headers" do
      expect(mail.subject).to eq("Send password")
      expect(mail.to).to eq([user.email])
      expect(mail.from).to eq(["from@example.com"])
    end

    it "has the correct text content" do
      expect(text_content).to include("Olá, sua senha de acesso é: #{password}")
    end

    it "has the correct html content" do
      expect(html_content).to include("Olá, sua senha de acesso é: #{password}")
    end
  end

end
