class Contact < ActionMailer::Base
  default from: "from@example.com"

  def welcome(email)
    @user = email
    @subject = "Welcome to Code For America"
  end
end
