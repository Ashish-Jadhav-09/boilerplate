export default {
  getUserData: async (_, { role }, { dataSources: { userApi } }) => {
    try {
      const respose = await userApi.getUserData(role);
      return respose?.data;
    } catch (error) {
      console.log("get user data error ::", error);
    }
  },
};
