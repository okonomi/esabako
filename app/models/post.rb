class Post
  include Her::Model
  include ActiveModel::Serialization
  collection_path 'teams/:team_name/posts'
end
