class PostsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_team
  before_action :set_post, only: [:show, :edit, :destroy]

  # GET /posts
  # GET /posts.json
  def index
    @posts = @team.posts
  end

  # GET /posts/1
  # GET /posts/1.json
  def show
    render json: @post
  end

  # GET /posts/new
  def new
    @post = Post.new
  end

  # GET /posts/1/edit
  def edit
  end

  # POST /posts
  # POST /posts.json
  def create
    @post = Post.new(post: post_params, _team_name: @team.name)

    respond_to do |format|
      if @post.save
        format.html { redirect_to @post, notice: 'Post was successfully created.' }
        format.json { render json: @post, status: :created }
      else
        format.html { render :new }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /posts/1
  # PATCH/PUT /posts/1.json
  def update
    respond_to do |format|
      if Post.save_existing(params[:number], post: post_params, _team_name: @team.name)
        format.html { redirect_to @post, notice: 'Post was successfully updated.' }
        format.json { render json: { message: 'ok' }, status: :ok }
      else
        format.html { render :edit }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /posts/1
  # DELETE /posts/1.json
  def destroy
    @post.destroy
    respond_to do |format|
      format.html { redirect_to posts_url, notice: 'Post was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    def set_team
      @team = Team.find(params[:team_name])
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = @team.posts.find(params[:number])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def post_params
      params.fetch(:post, {}).permit(:name, :body_md).to_h
    end
end
