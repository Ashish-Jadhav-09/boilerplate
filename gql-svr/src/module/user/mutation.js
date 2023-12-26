import pubsub from '../pubsub';
import { ADDUSER } from '../../libs/constant';

export default {
  registerUser: async (_, { input }, { dataSources: { userApi } }) => {
    try {
      const data = await userApi.registerUser(input);
      pubsub.publish(ADDUSER, {
        userAdded: data?.data,
      });
      return data;
    } catch (error) {
      console.log('CATCH BLOCK : Module : User : Mutation : registerUser =>', error);
      return error;
    }
  },

  login: async (_, { input }, { dataSources: { userApi } }) => {
    try {
      const { email, password } = input;
      return await userApi.loginUser({ email, password });
    } catch (error) {
      console.log('CATCH BLOCK : Module : User : Mutation : login =>', error);
      return error;
    }
  },
};
