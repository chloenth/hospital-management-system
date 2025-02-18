const identity_prefix = '/identity';

const API = {
  LOGIN: `${identity_prefix}/auth/token`,
  MY_INFO: `${identity_prefix}/users/my-info`,
  ADD_USER: `${identity_prefix}/users/registration`,
};

export default API;
