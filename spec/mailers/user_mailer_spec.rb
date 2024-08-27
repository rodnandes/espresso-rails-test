require "rails_helper"

RSpec.describe UserMailer, type: :mailer do
  describe "send_password" do
    let(:mail) { UserMailer.send_password }

    it "renders the headers" do
      expect(mail.subject).to eq("Send password")
      expect(mail.to).to eq(["to@example.org"])
      expect(mail.from).to eq(["from@example.com"])
    end

    it "renders the body" do
      expect(mail.body.encoded).to match("Hi")
    end
  end

end
