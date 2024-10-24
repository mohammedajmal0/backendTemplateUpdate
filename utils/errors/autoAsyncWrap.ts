import { Router } from 'express';
import asyncWrapper from './asyncErrorWrapper';

const autoAsyncWrapper = (router: Router) => {
  router.stack.forEach((layer: any) => {
    if (layer.route) {
      layer.route.stack.forEach((route: any) => {
        if (route.handle.length === 3) {
          route.handle = asyncWrapper(route.handle);
        }
      });
    } else if (layer.name === 'router') {
      layer.handle.stack.forEach((subLayer: any) => {
        subLayer.route.stack.forEach((route: any) => {
          if (route.handle.length === 3) {
            route.handle = asyncWrapper(route.handle);
          }
        });
      });
    }
  });
  return router;
};

export default autoAsyncWrapper;
