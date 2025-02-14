import config from '~/config';
import { AuthLayout } from '~/layouts';
import Login from '~/pages/Login';

export const publicRoutes = [
  {
    path: config.routes.login,
    component: Login,
    layout: AuthLayout,
  },
];

export const privateRoutes = [];
