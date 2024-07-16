require 'rails_helper'

RSpec.describe "home/index.html.haml", type: :view do
  it "should show a welcome message" do
    render
    expect(rendered).to match /Welcome to my blog/
  end
end
