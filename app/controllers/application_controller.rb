class ApplicationController < ActionController::Base
  # protect_from_forgery with: :exception
  before_action :initialize_her

  def new_session_path(scope)
    new_user_session_path
  end

  private

  def initialize_her
    return unless user_signed_in?

    Her::API.setup url: 'https://api.esa.io/v1' do |c|
      # Request
      c.use FaradayMiddleware::OAuth2, current_user.token, token_type: :bearer
      c.use Faraday::Request::UrlEncoded

      # Response
      c.use Her::Middleware::DefaultParseJSON

      c.use FaradayMiddleware::Instrumentation
      c.use Faraday::Response::Logger

      # Adapter
      c.use Faraday::Adapter::NetHttp
    end
  end
end
