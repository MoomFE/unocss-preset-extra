import { resolve } from 'path';
import { outputFileSync, readFileSync } from 'fs-extra';
import { getPackageInfoSync } from 'local-pkg';
import { camelCase, kebabCase } from 'lodash-es';
import fg from 'fast-glob';
import postcss from 'postcss';
import postcssJs from 'postcss-js';

const rootPath = getPackageInfoSync('animate.css')!.rootPath;
const cssPaths = fg.sync(['source/*/*.css'], { cwd: rootPath }).map((path) => {
  return resolve(rootPath, path);
});

const styles = Object.fromEntries(
  cssPaths.map((path) => {
    const code = readFileSync(path, { encoding: 'utf-8' });
    const rules = Object.entries(
      postcssJs.objectify(postcss.parse(code)),
    );

    const [name, css] = rules.find(([key]) => key.startsWith('.'))!;
    const keyframes = rules.find(([key]) => key.startsWith('@'))![1];

    if (css.animationName)
      css.animationName = camelCase(`une-${css.animationName}`);

    return [
      kebabCase(name.replace(/^(\.animated)?\./, '')),
      {
        css,
        keyframes,
      },
    ];
  }),
);

outputFileSync(
  resolve(__dirname, '../src/rules/animated.json'),
  `${JSON.stringify(styles, null, 2)}\n`,
);
