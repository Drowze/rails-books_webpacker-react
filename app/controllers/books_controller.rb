class BooksController < ApplicationController
  skip_before_action :verify_authenticity_token
  rescue_from ActiveRecord::RecordNotFound, with: :render_record_not_found

  def index
    @books = Book.all
    respond_to do |f|
      f.html
      f.json { render json: @books, status: :ok }
    end
  end

  def create
    book = Book.new params.require(:book).permit(:author, :title, :year)
    if book.save
      render json: book, status: :created
    else
      render json: { error: 'title_already_exists' }, status: :unprocessable_entity
    end
  end

  def show
    @book = Book.find(params.fetch(:id))
    respond_to do |f|
      f.html { render react_component: 'Book', props: @book }
      f.json { render json: @book }
    end
  end

  def destroy
    Book.find(params.fetch(:id)).destroy
    head :no_content
  end

  private

  def render_record_not_found
    head :no_content
  end
end