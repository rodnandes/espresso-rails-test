# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: redirect('/despesas')
  get 'despesas', to: 'statements#index'
  get 'funcionarios', to: 'employees#index'
  get 'cartoes', to: 'cards#index'
  get 'categorias', to: 'categories#index'
end
