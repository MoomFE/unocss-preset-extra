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

describe('elevation', async () => {
  const generator = createGenerator({
    presets: [
      presetUno(),
      presetAttributify(),
      presetExtra(),
    ],
  });

  const autocomplete = createAutocomplete(generator);

  const elevationRules = Object.assign({}, ...Array.from({ length: 25 }).map((_, index) => {
    return {
      [`.elevation-${index}`]: {
        boxShadow: `${umbra[index]} rgba(0, 0, 0, calc(${umbraOpacity} * var(--une-el-opacity, 1))), `
                    + `${penumbra[index]} rgba(0, 0, 0, calc(${penumbraOpacity} * var(--une-el-opacity, 1))), `
                    + `${ambient[index]} rgba(0, 0, 0, calc(${ambientOpacity} * var(--une-el-opacity, 1)))`,
      },
    };
  }));

  test('elevation-*', async () => {
    const { css } = await generator.generate(
      Array.from({ length: 36 }).map((_, i) => `elevation-${i}`).join(' '), // 多生成几个, 测试是否非 0 ~ 24 的 elevation 会被忽略
    );

    expect(
      removeUnusedItems(
        postcssJs.objectify(postcss.parse(css)),
      ),
    ).toEqual(
      elevationRules,
    );
  });

  test('shadow-elevation-*', async () => {
    const { css } = await generator.generate(
      Array.from({ length: 36 }).map((_, i) => `shadow-elevation-${i}`).join(' '), // 多生成几个, 测试是否非 0 ~ 24 的 elevation 会被忽略
    );

    expect(
      removeUnusedItems(
        postcssJs.objectify(postcss.parse(css)),
      ),
    ).toEqual(
      Object.fromEntries(
        Object.entries(elevationRules).map(([key, value]) => {
          return [key.replace('.elevation', '.shadow-elevation'), value];
        }),
      ),
    );
  });

  test('elevation-(op|opacity)-*', async () => {
    const { css } = await generator.generate(
      Array.from({ length: 101 }).map((_, i) => `elevation-op-${i}`).join(' '),
    );
    const { css: css2 } = await generator.generate(
      Array.from({ length: 101 }).map((_, i) => `elevation-opacity-${i}`).join(' '),
    );

    expect(
      removeUnusedItems(
        postcssJs.objectify(postcss.parse(css)),
      ),
    ).toEqual(
      Object.assign({}, ...Array.from({ length: 101 }).map((_, i) => {
        return {
          [`.elevation-op-${i}`]: {
            '--une-el-opacity': `${i / 100}`,
          },
        };
      })),
    );

    expect(
      removeUnusedItems(
        postcssJs.objectify(postcss.parse(css2)),
      ),
    ).toEqual(
      Object.assign({}, ...Array.from({ length: 101 }).map((_, i) => {
        return {
          [`.elevation-opacity-${i}`]: {
            '--une-el-opacity': `${i / 100}`,
          },
        };
      })),
    );
  });

  test('shadow-elevation-(op|opacity)-*', async () => {
    const { css } = await generator.generate(
      Array.from({ length: 101 }).map((_, i) => `shadow-elevation-op-${i}`).join(' '),
    );
    const { css: css2 } = await generator.generate(
      Array.from({ length: 101 }).map((_, i) => `shadow-elevation-opacity-${i}`).join(' '),
    );

    expect(
      removeUnusedItems(
        postcssJs.objectify(postcss.parse(css)),
      ),
    ).toEqual(
      Object.assign({}, ...Array.from({ length: 101 }).map((_, i) => {
        return {
          [`.shadow-elevation-op-${i}`]: {
            '--une-el-opacity': `${i / 100}`,
          },
        };
      })),
    );

    expect(
      removeUnusedItems(
        postcssJs.objectify(postcss.parse(css2)),
      ),
    ).toEqual(
      Object.assign({}, ...Array.from({ length: 101 }).map((_, i) => {
        return {
          [`.shadow-elevation-opacity-${i}`]: {
            '--une-el-opacity': `${i / 100}`,
          },
        };
      })),
    );
  });

  test('autocomplete', async () => {
    expect(
      await autocomplete.suggest('elevation-'),
    ).toMatchSnapshot();

    expect(
      await autocomplete.suggest('shadow-elevation-'),
    ).toMatchSnapshot();
  });
});
