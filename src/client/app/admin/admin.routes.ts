import { ProductComponent, AdminComponent } from './index';

export const AdminRoutes = [
  {
      path: '/admin',
      component: AdminComponent,
      children: [
          {
              path: '/',
              component: ProductComponent
          }
      ]
  }
];