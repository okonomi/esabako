Rails.application.routes.draw do
  devise_for :users
  resource :sandbox, only: :show
  resources :posts

  get '/auth/:provider/callback' => 'sessions#create'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
