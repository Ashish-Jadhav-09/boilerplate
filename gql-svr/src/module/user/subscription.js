import pubsub from '../pubsub';
import { ADDUSER, UPDATEUSER, DELETEUSER } from '../../libs/constant';

export default {
  userAdded: {
    subscribe: () => pubsub.asyncIterator(ADDUSER),
  },
  userUpdated: {
    subscribe: () => pubsub.asyncIterator(UPDATEUSER),
  },
  userDeleted: {
    subscribe: () => pubsub.asyncIterator(DELETEUSER),
  },
};
