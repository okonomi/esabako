class Team
  include Her::Model
  primary_key :name
  has_many :posts
end
