const identity_prefix = '/identity';
const search_prefix = '/search';
const profile_prefix = '/profile';

const API = {
  LOGIN: `${identity_prefix}/auth/token`,
  MY_INFO: `${identity_prefix}/users/my-info`,
  ADD_USER: `${identity_prefix}/users/registration`,
  GET_USERS: `${search_prefix}/users`,
  CHANGE_USERNAME: (userId) =>
    `${identity_prefix}/users/${userId}/change-username`,
  CHANGE_PASSWORD: (userId) =>
    `${identity_prefix}/users/${userId}/change-password`,
  GET_USER: (userId) => `${search_prefix}/users/${userId}`,
  UPDATE_PROFILE: (profileId) => `${profile_prefix}/users/${profileId}`,
};

export default API;
