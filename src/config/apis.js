const identity_prefix = '/identity';
const search_prefix = '/search';

const API = {
  LOGIN: `${identity_prefix}/auth/token`,
  MY_INFO: `${identity_prefix}/users/my-info`,
  ADD_USER: `${identity_prefix}/users/registration`,
  GET_USERS: `${search_prefix}/users`,
  CHANGE_USERNAME: (userId) =>
    `${identity_prefix}/users/${userId}/change-usernam`,
};

export default API;
