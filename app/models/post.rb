class Post
  include Her::Model
  collection_path 'teams/:team_name/posts'
end
