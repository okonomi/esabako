class User < ApplicationRecord
  devise :omniauthable, omniauth_providers: %i[esa]

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.nickname = auth.info.nickname
      user.image_url = auth.info.image
      user.token = auth.credentials.token
    end
  end
end
