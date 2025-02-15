import config from '~/config';
import { AuthLayout } from '~/layouts';
import Login from '~/pages/Login';
import AdminDashboard from '~/pages/admin/Dashboard';

export const publicRoutes = [
  {
    path: config.routes.login,
    component: Login,
    layout: AuthLayout,
  },
];

export const privateRoutes = [
  {
    path: config.routes.admin,
    component: AdminDashboard,
  },
];
