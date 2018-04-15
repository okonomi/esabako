class Member
  include Her::Model
  include ActiveModel::Serialization

  parse_root_in_json true, format: :active_model_serializers

  belongs_to :team
end
