import { resolve } from 'node:path';
import { build } from 'vite';
import { rollup } from 'rollup';
import { emptyDirSync } from 'fs-extra';
import dts from 'rollup-plugin-dts';

/** 项目根目录 */
const rootPath = resolve(__dirname, '../');
/** 代码根目录 */
const srcPath = resolve(rootPath, 'src');
/** 打包目录 */
const buildPath = resolve(rootPath, 'dist');
/** 入口文件 */
const entry = resolve(srcPath, 'index.ts');

(async () => {
  // 清空输出目录
  emptyDirSync(resolve(rootPath, 'dist'));

  // 打包代码
  await build({
    resolve: {
      alias: { '@': srcPath },
    },
    build: {
      outDir: buildPath,
      lib: {
        entry,
        formats: ['es', 'cjs'],
        fileName: format => `index.${format === 'es' ? 'mjs' : format}`,
      },
      minify: false,
      rollupOptions: {
        external: ['unocss'],
      },
    },
  });

  // 打包声明文件
  await rollup({
    input: entry,
    external: ['unocss'],
    plugins: [
      dts({
        compilerOptions: { preserveSymlinks: false },
      }),
    ],
  }).then((bundle) => {
    bundle.write({
      file: resolve(buildPath, 'index.d.ts'),
      format: 'es',
    });
  });
})();
