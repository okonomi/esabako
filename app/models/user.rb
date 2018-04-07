class User < ApplicationRecord
  devise :omniauthable, omniauth_providers: %i[esa]

  def self.from_omniauth(auth)
    user = find_or_initialize_by(provider: auth.provider, uid: auth.uid)
    user.nickname = auth.info.nickname
    user.image_url = auth.info.image
    user.token = auth.credentials.token
    user.save!
    user
  end
end
