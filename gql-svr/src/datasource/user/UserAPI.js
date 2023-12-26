import { RESTDataSource } from 'apollo-datasource-rest';
import configurations from '../../config/configurations';

class UserAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `${configurations.serviceURl}/user`;
  }

  willSendRequest(request) {
    request.headers.set('Authorization', this.context.authorization);
  }

  getUserData = async (role) => {
    try {
      return await this.get('/allUsersData', { role });
    } catch (error) {
      console.log('CATCH BLOCK : DataSource : UserAPI : getUserData =>', error);
      throw error;
    }
  };

  registerUser = async (input) => {
    try {
      return await this.post('/', input);
    } catch (error) {
      console.log('CATCH BLOCK : DataSource : UserAPI : registeUser =>', error);
      throw error;
    }
  };

  loginUser = async (input) => {
    try {
      return await this.post('/login', input);
    } catch (error) {
      console.log('CATCH BLOCK : DataSource : UserAPI : loginUser =>', error);
      throw error;
    }
  };

  updateUserData = async (input) => {
    try {
      const { originalId } = input;
      return await this.put(`/${originalId}`, input);
    } catch (error) {
      console.log('CATCH BLOCK : DataSource : UserAPI : updateUserData =>', error);
      throw error;
    }
  };

  deletedUser = async (input) => {
    try {
      const { originalId } = input;
      return await this.delete(`/${originalId}`);
    } catch (error) {
      console.log('CATCH BLOCK : DataSource : UserAPI : deletedUser =>', error);
      throw error;
    }
  };
}

export default UserAPI;
