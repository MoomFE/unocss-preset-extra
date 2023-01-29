import { resolve } from 'path';
import { defineConfig, presetAttributify, presetIcons, presetUno, transformerDirectives, transformerVariantGroup } from 'unocss';
import { presetExtra } from 'unocss-preset-extra';
import { presetScrollbar } from 'unocss-preset-scrollbar';
import { outputFileSync } from 'fs-extra';
import { dataToEsm } from '@rollup/pluginutils';
import animatedJson from '../src/rules/animated.json';

export default defineConfig({
  shortcuts: [
    // 动态颜色
    ['text-dynamic', 'text-[#333639] dark:text-white dark:text-op-82'],
    ['bg-dynamic', 'bg-white dark:bg-[#101014]'],
    ['card-bg-dynamic', 'bg-white dark:bg-[#242424]'],
  ],
  safelist: [
    ...Array.from({ length: 25 }, (_, i) => `el-${i}`),
    ...Array.from({ length: 101 }, (_, i) => `el-op-${i}`),
    ...Object.keys(animatedJson).map(n => `animated-${n}`),
    'animated-faster', 'animated-fast', 'animated-slow', 'animated-slower',
  ],
  theme: {
    // 颜色
    colors: {
      // Primary 颜色
      'primary': '#2080f0',
      'primary-hover': '#4098fc',
      'primary-active': '#1060c9',
      // Info 颜色
      'info': '#909399',
      'info-hover': '#a6a9ad',
      'info-active': '#82848a',
      // Success 颜色
      'success': '#18a058',
      'success-hover': '#36ad6a',
      'success-active': '#0c7a43',
      // Warning 颜色
      'warning': '#f0a020',
      'warning-hover': '#fcb040',
      'warning-active': '#c97c10',
      // Error 颜色
      'error': '#d03050',
      'error-hover': '#de576d',
      'error-active': '#ab1f3f',
    },
    // 断点
    breakpoints: {
      'xs': '480px',
      'sm': '576px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    // 过渡持续时间
    duration: {
      colors: '300ms',
    },
  },
  presets: [
    // 默认预设, 和 Tailwind 类似
    presetUno(),
    // 属性模式
    presetAttributify({
      prefix: 'un:',
      prefixedOnly: true,
    }),
    // 图标预设
    presetIcons(),
    // 类名简写及额外一些样式预设
    presetExtra(),
    // 滚动条
    presetScrollbar(),
  ],
  transformers: [
    // 在 CSS 中使用 @apply 指令
    transformerDirectives(),
    // 变体组功能
    transformerVariantGroup(),
  ],
  extendTheme: (theme) => {
    // 始终生成一个 UnoCSS 主题样式配置文件, 方便在 JS 中引用
    outputFileSync(
      resolve(__dirname, './src/shared/unocss.theme.ts'),
      `/* eslint-disable */\n\n${dataToEsm(theme, {
        preferConst: true,
        indent: '  ',
        objectShorthand: true,
      })}`,
    );
  },
});
