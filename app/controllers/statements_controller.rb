# frozen_string_literal: true

class StatementsController < ApplicationController
  def index
    @statements = Statement.all
  end
end
