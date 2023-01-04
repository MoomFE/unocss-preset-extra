import { ViteSSG } from 'vite-ssg';
import { isBrowser } from '@moomfe/small-utils';
import App from './App.vue';
import type { UserModule } from './types';
import routes from '@/modules/router/routes';

import '@unocss/reset/tailwind.css';
import 'uno.css';
import '@/styles/styles.scss';

// 修复 Naive UI 和 Tailwind Reset 的样式冲突
isBrowser && document.head.insertAdjacentHTML('beforeend', '<meta name="naive-ui-style" />');

export const createApp = ViteSSG(
  App,
  { routes },
  (ctx) => {
    Object.values(import.meta.glob<{ install: UserModule }>('./modules/**/index.ts', { eager: true })).forEach(m => m.install?.(ctx));
  },
);
