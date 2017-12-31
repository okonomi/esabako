class Post
  include ActiveModel::Model

  attr_accessor :id,
                :number,
                :name,
                :body_md,
                :body_html
end
