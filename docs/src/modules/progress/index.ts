import type { UserModule } from '@/types';
import { app } from '@/shared/env';

export const install: UserModule = ({ isClient, router }) => {
  if (isClient) {
    router.beforeEach(() => {
      app.loadingBar?.start();
    });

    router.afterEach(() => {
      app.loadingBar?.finish();
    });
  }
};
