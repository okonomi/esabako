Her::API.setup url: 'https://api.esa.io/v1' do |c|
  # Request
  c.use FaradayMiddleware::OAuth2, ENV['ESA_ACCESS_TOKEN'], token_type: :bearer
  c.use Faraday::Request::UrlEncoded

  # Response
  c.use Her::Middleware::DefaultParseJSON

  c.use FaradayMiddleware::Instrumentation
  c.use Faraday::Response::Logger

  # Adapter
  c.use Faraday::Adapter::NetHttp
end
