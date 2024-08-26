require "rails_helper"

RSpec.describe Api::V1::EmployeesController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/api/v1/employees").to route_to("api/v1/employees#index")
    end

    it "routes to #show" do
      expect(get: "/api/v1/employees/1").to route_to("api/v1/employees#show", id: "1")
    end


    it "routes to #create" do
      expect(post: "/api/v1/employees").to route_to("api/v1/employees#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/api/v1/employees/1").to route_to("api/v1/employees#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/api/v1/employees/1").to route_to("api/v1/employees#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/api/v1/employees/1").to route_to("api/v1/employees#destroy", id: "1")
    end
  end
end
