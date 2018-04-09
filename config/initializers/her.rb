Her::API.setup url: 'https://api.esa.io/v1' do |c|
  # Request
  c.use FaradayMiddleware::OAuth2, '4ac04e54ba0726ccb3135231a76ec6ca0e83586533b00ae1af53f371404ffed9', token_type: :bearer
  c.use Faraday::Request::UrlEncoded

  # Response
  c.use Her::Middleware::DefaultParseJSON

  c.use FaradayMiddleware::Instrumentation
  c.use Faraday::Response::Logger

  # Adapter
  c.use Faraday::Adapter::NetHttp
end
