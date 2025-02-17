import config from '~/config';
import { AuthLayout } from '~/layouts';
import Login from '~/pages/Login';
import Admin from '~/pages/admin';

export const publicRoutes = [
  {
    path: config.routes.login,
    component: Login,
    layout: AuthLayout,
  },
];

export const privateRoutes = [
  {
    path: config.routes.admin.dashboard,
    component: Admin.Dashboard,
  },
  {
    path: config.routes.admin.appointments,
    component: Admin.Appointments,
  },
  {
    path: config.routes.admin.patients,
    component: Admin.Patients,
  },
  {
    path: config.routes.admin.doctors,
    component: Admin.Doctors,
  },
  {
    path: config.routes.admin.users,
    component: Admin.Users,
  },
];
