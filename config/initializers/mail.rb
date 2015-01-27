ActionMailer::Base.smtp_settings = {
  :address        => Settings.mailer.address,
  :port           => Settings.mailer.port,
  :authentication => Settings.mailer.authentication,
  :user_name      => Settings.mailer.username,
  :password       => Settings.mailer.password,
  :domain         => Settings.mailer.domain,
  :enable_starttls_auto => true
}
ActionMailer::Base.default_url_options = { :host => Settings.mailer.host, :protocol => (Settings.mailer.try(:protocol) || 'https')  }
ActionMailer::Base.delivery_method ||= :smtp
ActionMailer::Base.default :from => (ma = Mail::Address.new(Settings.mailer.from_email);ma.display_name = Settings.mailer.from_name;ma.format)
