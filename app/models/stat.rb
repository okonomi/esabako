class Stat
  include Her::Model
  include ActiveModel::Serialization

  belongs_to :team
end
