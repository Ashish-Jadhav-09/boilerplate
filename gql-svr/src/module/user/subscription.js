import pubsub from "../pubsub";
import { ADDUSER, UPDATEUSER, DELETEUSER } from "../../libs/constant";
export default {
  userAdded: {
    subscribe: () => {
      return pubsub.asyncIterator(ADDUSER);
    },
  },
  userUpdated: {
    subscribe: () => {
      return pubsub.asyncIterator(UPDATEUSER);
    },
  },
  userDeleted: {
    subscribe: () => {
      return pubsub.asyncIterator(DELETEUSER);
    },
  },
};
