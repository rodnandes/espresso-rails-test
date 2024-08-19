class StatementsController < ApplicationController
  def index
    @statements = Statement.all
  end
end
