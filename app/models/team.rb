class Team
  include Her::Model
  primary_key :name
  has_many :posts
  has_many :members
  has_one :stats
end
