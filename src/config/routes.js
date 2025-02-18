const adminBaseRoute = '/admin';

const admin = {
  dashboard: adminBaseRoute,
  appointments: `${adminBaseRoute}/appointments`,
  doctors: `${adminBaseRoute}/doctors`,
  patients: `${adminBaseRoute}/patients`,
  users: {
    viewUsers: `${adminBaseRoute}/users`,
    addUser: `${adminBaseRoute}/users/add-new`,
  },
};

const routes = {
  home: '/',
  login: '/login',
  signup: '/signup',
  admin,
};

export default routes;
