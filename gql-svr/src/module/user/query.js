export default {
  getUserData: async (_, { role }, { dataSources: { userApi } }) => {
    try {
      const respose = await userApi.getUserData(role);
      return respose?.data;
    } catch (error) {
      console.log('CATCH BLOCK : Module : User : Query : getUserData =>', error);
      return error;
    }
  },
  getProfile: async (_, __, { dataSources: { userApi } }) => {
    try {
      const respose = await userApi.getProfile();
      return respose?.data;
    } catch (error) {
      console.log('CATCH BLOCK : Module : User : Query : getProfile =>', error);
      return error;
    }
  },
};
