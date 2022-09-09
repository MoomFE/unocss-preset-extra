import { resolve } from 'path';
import { outputFile, readFile } from 'fs-extra';
import { getPackageInfoSync } from 'local-pkg';
import { camelCase, kebabCase } from 'lodash-es';
import fg from 'fast-glob';
import postcss from 'postcss';
import postcssJs from 'postcss-js';
import cssnano from 'cssnano';

const cssMinify = postcssJs.async([
  cssnano(),
]);

const rootPath = getPackageInfoSync('animate.css')!.rootPath;
const paths = fg.sync(['source/*/*.css'], { cwd: rootPath }).map((path) => {
  return resolve(rootPath, path);
});

const styles = {};

(async () => {
  // 读取并解析样式
  for (const path of paths) {
    const code = await readFile(path, 'utf-8');
    const rules = Object.entries(
      postcssJs.objectify(postcss.parse(code)),
    );

    const rule = rules.find(([k]) => k.startsWith('.'))!;
    const keyframes = await postcss().process( // @ts-expect-error
      await cssMinify(rules.find(([k]) => k.startsWith('@'))![1]), { parser: postcssJs },
    );

    const name = rule[0].replace(/^(\.animated)?\./, '');
    const css = rule[1] as HTMLElement['style'];

    // 动画名称为 une 开头且为 camelCase 格式
    css.animationName = camelCase(`une-${css.animationName}`);

    styles[kebabCase(name)] = {
      css,
      keyframes: keyframes.css.replace(/\n(\s+)?/g, ' '),
    };
  }

  outputFile(
    resolve(__dirname, '../src/rules/animated.json'),
    `${JSON.stringify(styles, null, 2)}\n`,
  );
})();
