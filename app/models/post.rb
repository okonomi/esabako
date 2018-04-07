class Post
  include ActiveModel::Model

  attr_accessor :id,
                :number,
                :name,
                :body_md,
                :body_html

  def update(token, team, params)
    client = Esa::Client.new(access_token: token, current_team: team)
    client.update_post(number, name: params[:name], body_md: params[:body_md])
  end

  def persisted?
    id.present?
  end
end
