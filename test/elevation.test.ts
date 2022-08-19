import { createGenerator, presetAttributify, presetUno } from 'unocss';
import { describe, expect, test } from 'vitest';
import { createAutocomplete } from '@unocss/autocomplete';
import { omit } from 'lodash-es';
import postcss from 'postcss';
import postcssJs from 'postcss-js';
import { ambient, ambientOpacity, penumbra, penumbraOpacity, umbra, umbraOpacity } from '@@/src/rules/elevation';
import { presetExtra } from '@/index';

function removeUnusedItems(cssJson: object) {
  return omit(cssJson, ['*,::before,::after', '::backdrop']);
}

function createElevationRules(name: string) {
  return Object.assign({}, ...Array.from({ length: 25 }).map((_, index) => {
    return {
      [`.${name}-${index}`]: {
        boxShadow: `${umbra[index]} rgba(0, 0, 0, calc(${umbraOpacity} * var(--une-el-opacity, var(--un-shadow-opacity, 1)))), `
                    + `${penumbra[index]} rgba(0, 0, 0, calc(${penumbraOpacity} * var(--une-el-opacity, var(--un-shadow-opacity, 1)))), `
                    + `${ambient[index]} rgba(0, 0, 0, calc(${ambientOpacity} * var(--une-el-opacity, var(--un-shadow-opacity, 1))))`,
      },
    };
  }));
}

function createElevationOpacityRules(name: string) {
  return Object.assign({}, ...Array.from({ length: 101 }).map((_, i) => {
    return {
      [`.${name}-${i}`]: {
        '--une-el-opacity': `${i / 100}`,
      },
    };
  }));
}

describe('elevation', async () => {
  const generator = createGenerator({
    presets: [
      presetUno(),
      presetAttributify(),
      presetExtra(),
    ],
  });

  const autocomplete = createAutocomplete(generator);

  test('(shadow-)?(el|elevation)-*', async () => {
    // el-*
    const { css } = await generator.generate(
      Array.from({ length: 36 }).map((_, i) => `el-${i}`).join(' '), // 多生成几个, 测试是否非 0 ~ 24 的 elevation 会被忽略
    );

    expect(
      removeUnusedItems(
        postcssJs.objectify(postcss.parse(css)),
      ),
    ).toEqual(
      createElevationRules('el'),
    );

    // elevation-*
    const { css: css2 } = await generator.generate(
      Array.from({ length: 36 }).map((_, i) => `elevation-${i}`).join(' '), // 多生成几个, 测试是否非 0 ~ 24 的 elevation 会被忽略
    );

    expect(
      removeUnusedItems(
        postcssJs.objectify(postcss.parse(css2)),
      ),
    ).toEqual(
      createElevationRules('elevation'),
    );

    // shadow-el-*
    const { css: css3 } = await generator.generate(
      Array.from({ length: 36 }).map((_, i) => `shadow-el-${i}`).join(' '), // 多生成几个, 测试是否非 0 ~ 24 的 elevation 会被忽略
    );

    expect(
      removeUnusedItems(
        postcssJs.objectify(postcss.parse(css3)),
      ),
    ).toEqual(
      createElevationRules('shadow-el'),
    );

    // shadow-elevation-*
    const { css: css4 } = await generator.generate(
      Array.from({ length: 36 }).map((_, i) => `shadow-elevation-${i}`).join(' '), // 多生成几个, 测试是否非 0 ~ 24 的 elevation 会被忽略
    );

    expect(
      removeUnusedItems(
        postcssJs.objectify(postcss.parse(css4)),
      ),
    ).toEqual(
      createElevationRules('shadow-elevation'),
    );
  });

  test('(shadow-)?(el|elevation)-(op|opacity)-*', async () => {
    // el-op-*
    const { css } = await generator.generate(
      Array.from({ length: 101 }).map((_, i) => `el-op-${i}`).join(' '),
    );

    expect(
      removeUnusedItems(
        postcssJs.objectify(postcss.parse(css)),
      ),
    ).toEqual(
      createElevationOpacityRules('el-op'),
    );

    // el-opacity-*
    const { css: css2 } = await generator.generate(
      Array.from({ length: 101 }).map((_, i) => `el-opacity-${i}`).join(' '),
    );

    expect(
      removeUnusedItems(
        postcssJs.objectify(postcss.parse(css2)),
      ),
    ).toEqual(
      createElevationOpacityRules('el-opacity'),
    );

    // elevation-op-*
    const { css: css3 } = await generator.generate(
      Array.from({ length: 101 }).map((_, i) => `elevation-op-${i}`).join(' '),
    );

    expect(
      removeUnusedItems(
        postcssJs.objectify(postcss.parse(css3)),
      ),
    ).toEqual(
      createElevationOpacityRules('elevation-op'),
    );

    // elevation-opacity-*
    const { css: css4 } = await generator.generate(
      Array.from({ length: 101 }).map((_, i) => `elevation-opacity-${i}`).join(' '),
    );

    expect(
      removeUnusedItems(
        postcssJs.objectify(postcss.parse(css4)),
      ),
    ).toEqual(
      createElevationOpacityRules('elevation-opacity'),
    );

    // shadow-el-op-*
    const { css: css5 } = await generator.generate(
      Array.from({ length: 101 }).map((_, i) => `shadow-el-op-${i}`).join(' '),
    );

    expect(
      removeUnusedItems(
        postcssJs.objectify(postcss.parse(css5)),
      ),
    ).toEqual(
      createElevationOpacityRules('shadow-el-op'),
    );

    // shadow-el-opacity-*
    const { css: css6 } = await generator.generate(
      Array.from({ length: 101 }).map((_, i) => `shadow-el-opacity-${i}`).join(' '),
    );

    expect(
      removeUnusedItems(
        postcssJs.objectify(postcss.parse(css6)),
      ),
    ).toEqual(
      createElevationOpacityRules('shadow-el-opacity'),
    );

    // shadow-elevation-op-*
    const { css: css7 } = await generator.generate(
      Array.from({ length: 101 }).map((_, i) => `shadow-elevation-op-${i}`).join(' '),
    );

    expect(
      removeUnusedItems(
        postcssJs.objectify(postcss.parse(css7)),
      ),
    ).toEqual(
      createElevationOpacityRules('shadow-elevation-op'),
    );

    // shadow-elevation-opacity-*
    const { css: css8 } = await generator.generate(
      Array.from({ length: 101 }).map((_, i) => `shadow-elevation-opacity-${i}`).join(' '),
    );

    expect(
      removeUnusedItems(
        postcssJs.objectify(postcss.parse(css8)),
      ),
    ).toEqual(
      createElevationOpacityRules('shadow-elevation-opacity'),
    );
  });

  test('autocomplete', async () => {
    expect(
      await autocomplete.suggest('el-'),
    ).toMatchSnapshot();

    expect(
      await autocomplete.suggest('elevation-'),
    ).toMatchSnapshot();

    expect(
      await autocomplete.suggest('shadow-elevation-'),
    ).toMatchSnapshot();
  });
});
