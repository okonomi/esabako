class Member
  include Her::Model
  include ActiveModel::Serialization
  belongs_to :team
  parse_root_in_json true, format: :active_model_serializers
end
