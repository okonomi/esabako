class Post
  include Her::Model
  include ActiveModel::Serialization

  parse_root_in_json true, format: :active_model_serializers
  collection_path 'teams/:team_name/posts'
  primary_key :number

  belongs_to :team
end
