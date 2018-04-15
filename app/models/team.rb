class Team
  include Her::Model

  primary_key :name
  parse_root_in_json true, format: :active_model_serializers

  has_many :posts
  has_many :members
  has_one :stats
end
