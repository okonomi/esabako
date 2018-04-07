module Users
  class OmniauthCallbacksController < Devise::OmniauthCallbacksController
    def esa
      @user = User.from_omniauth(request.env['omniauth.auth'])

      if @user.persisted?
        # default: first team
        client = Esa::Client.new(access_token: @user.token)
        team = client.teams.body['teams'].first['name']
        session['team'] = team
  
        sign_in_and_redirect @user, event: :authentication
        set_flash_message(:notice, :success, kind: 'esa') if is_navigational_format?
      else
        session['devise.esa_data'] = request.env['omniauth.auth']
        redirect_to root_path
      end
    end

    def failure
      redirect_to root_path
    end
  end
end
