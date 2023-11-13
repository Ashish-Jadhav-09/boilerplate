export { default as client } from "./apolloClient";
export { GET_ALL_USERS } from "./query";
export { LOGIN, REGISTER_USER, UPDATE_USER, DELETE_USER } from "./mutation";

export {
  UPDATE_USER_DATA_SUBSCRIPTION,
  ADD_USER_DATA_SUBSCRIPTION,
  ADD_FEEDBACK_SUBSCRIPTION,
} from "./subscription";
