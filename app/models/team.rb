class Team
  include Her::Model

  primary_key :name
  parse_root_in_json true, format: :active_model_serializers

  has_many :posts, dependent: :destroy
  has_many :members, dependent: :destroy
  has_one :stats, dependent: :destroy
end
