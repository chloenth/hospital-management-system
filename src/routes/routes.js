import config from '~/config';
import { AuthLayout } from '~/layouts';
import Login from '~/pages/Login';
import Admin from '~/pages/admin';

const adminRoutes = config.routes.admin;

export const publicRoutes = [
  {
    path: config.routes.login,
    component: Login,
    layout: AuthLayout,
  },
];

export const privateRoutes = [
  {
    path: adminRoutes.dashboard,
    component: Admin.Dashboard,
  },
  {
    path: adminRoutes.appointments,
    component: Admin.Appointments,
  },
  {
    path: adminRoutes.patients,
    component: Admin.Patients,
  },
  {
    path: adminRoutes.doctors,
    component: Admin.Doctors,
  },
  {
    path: adminRoutes.users.viewUsers,
    component: Admin.Users,
  },
  {
    path: adminRoutes.users.addUser,
    component: Admin.AddUser,
  },
];
