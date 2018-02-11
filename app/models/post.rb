class Post
  include ActiveModel::Model

  attr_accessor :id,
                :number,
                :name,
                :body_md,
                :body_html

  def update(params)
    client = Esa::Client.new(current_team: 'okonomi')
    client.update_post(number, body_md: params[:body_md])
  end

  def persisted?
    id.present?
  end
end
