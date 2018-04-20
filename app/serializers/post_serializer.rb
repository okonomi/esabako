class PostSerializer < ActiveModel::Serializer
  attributes :number,
             :name,
             :tags,
             :category,
             :full_name,
             :wip,
             :body_md,
             :created_at,
             :updated_at,
             :message,
             :revision_number,
             :comments_count,
             :tasks_count,
             :done_tasks_count,
             :stargazers_count,
             :watchers_count,
             :star,
             :watch  
end