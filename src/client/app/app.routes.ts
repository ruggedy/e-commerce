import { provideRouter, RouterConfig } from '@angular/router';

import { AboutRoutes } from './+about/index';
import { HomeRoutes } from './+home/index';
import { AdminRoutes} from './admin/index';
import { ProductsRoutes} from './+products/index';

const routes: RouterConfig = [
  ...HomeRoutes,
  ...AboutRoutes,
  ...AdminRoutes,
  ...ProductsRoutes
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),
];
