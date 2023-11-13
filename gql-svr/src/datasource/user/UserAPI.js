import { RESTDataSource } from "apollo-datasource-rest";
import configurations from "../../config/configurations";

class UserAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `${configurations.serviceURl}/user`;
  }

  willSendRequest(request) {
    request.headers.set("Authorization", this.context.authorization);
  }

  getUserData = async (role) => {
    try {
      return await this.get("/allUsersData", { role: role });
    } catch (error) {
      throw error;
    }
  };

  registerUser = async (input) => {
    try {
      return await this.post("/", input);
    } catch (error) {
      throw error;
    }
  };

  loginUser = async (input) => {
    try {
      return await this.post("/login", input);
    } catch (error) {
      throw error;
    }
  };

  updateUserData = async (input) => {
    try {
      const { originalId } = input;
      const updatedData = await this.put(`/${originalId}`, input);
      return updatedData;
    } catch (error) {
      throw error;
    }
  };

  deletedUser = async (input) => {
    try {
      const { originalId } = input;
      return await this.delete(`/${originalId}`);
    } catch (error) {
      throw error;
    }
  };
}

export default UserAPI;
