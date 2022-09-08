import { createGenerator, presetAttributify, presetUno } from 'unocss';
import { describe, expect, test } from 'vitest';
import { createAutocomplete } from '@unocss/autocomplete';
import { omit } from 'lodash-es';
import postcss from 'postcss';
import postcssJs from 'postcss-js';
import { presetExtra } from '@/index';

function removeUnusedItems(cssJson: object) {
  return omit(cssJson, ['*,::before,::after', '::backdrop']);
}

function removeLastZero(v: string | number) {
  return `${v}`.replace(/0+$/, '');
}

describe('animated', () => {
  const generator = createGenerator({
    presets: [
      presetUno(),
      presetAttributify(),
      presetExtra(),
    ],
  });

  const autocomplete = createAutocomplete(generator);

  test('animated', async () => {
    const { css } = await generator.generate('animated');

    expect(
      removeUnusedItems({
        ...postcssJs.objectify(postcss.parse(css)),
      }),
    ).toEqual({
      '.animated': {
        animationDuration: '1s',
        animationFillMode: 'both',
      },
    });
  });

  test('animated-repeat', async () => {
    const { css } = await generator.generate(`
      animated-infinite
      animated-repeat-infinite
      ${/* 0 ~ 66 */ Array.from({ length: 67 }, (_, i) => `animated-repeat-${i}`).join(' ')}
      ${/* 0.1, 1.2, ... ( 小数 ) */ Array.from({ length: 67 }, (_, i) => `animated-repeat-${i}.${removeLastZero(i + 1)}`).join(' ')}
      ${/* 0_1, 1_2, ... ( 不符合规则的样式类 ) */ Array.from({ length: 7 }, (_, i) => `animated-repeat-${i}_${removeLastZero(i + 1)}`).join(' ')}
      ${/* a ~ z ( 不符合规则的样式类 ) */ Array.from({ length: 26 }, (_, i) => `animated-repeat-${String.fromCharCode(97 + i)}`)}
    `);

    expect(
      removeUnusedItems({
        ...postcssJs.objectify(postcss.parse(css)),
      }),
    ).toEqual(
      Object.assign(
        // infinite, repeat-infinite
        {
          '.animated-infinite,\n.animated-repeat-infinite': { animationIterationCount: 'infinite' },
        },
        // 0 ~ 66
        ...Array.from({ length: 67 }, (_, i) => ({
          [`.animated-repeat-${i}`]: { animationIterationCount: `${i}` },
        })),
        // 0.1, 1.2, ... ( 小数 )
        ...Array.from({ length: 67 }, (_, i) => ({
          [`.animated-repeat-${i}\\.${removeLastZero(i + 1)}`]: { animationIterationCount: `${i}.${removeLastZero(i + 1)}` },
        })),
      ),
    );
  });

  test('animated-delay', async () => {
    const { css } = await generator.generate(`
      animated-delay-none
      ${/* 0 ~ 66 */ Array.from({ length: 67 }, (_, i) => `animated-delay-${i}`).join(' ')}
      ${/* 0ms ~ 66ms */ Array.from({ length: 67 }, (_, i) => `animated-delay-${i}ms`).join(' ')}
      ${/* 0s ~ 66s */ Array.from({ length: 67 }, (_, i) => `animated-delay-${i}s`).join(' ')}
      ${/* 0.1, 1.2, ... ( 小数 ) */ Array.from({ length: 67 }, (_, i) => `animated-delay-${i}.${removeLastZero(i + 1)}`).join(' ')}
      ${/* 0.1ms, 1.2ms, ... ( 小数 ) */ Array.from({ length: 67 }, (_, i) => `animated-delay-${i}.${removeLastZero(i + 1)}ms`).join(' ')}
      ${/* 0.1s, 1.2s, ... ( 小数 ) */ Array.from({ length: 67 }, (_, i) => `animated-delay-${i}.${removeLastZero(i + 1)}s`).join(' ')}
    `);

    expect(
      removeUnusedItems({
        ...postcssJs.objectify(postcss.parse(css)),
      }),
    ).toEqual(
      Object.assign(
        // 0, 0ms, none
        {
          '.animated-delay-0,\n.animated-delay-0ms,\n.animated-delay-none': { animationDelay: '0ms' },
        },
        // 1 ~ 66
        // 1ms ~ 66ms
        ...Array.from({ length: 66 }, (_, i) => ({
          [`.animated-delay-${i + 1},\n.animated-delay-${i + 1}ms`]: { animationDelay: `${i + 1}ms` },
        })),
        // 0s ~ 66s
        ...Array.from({ length: 67 }, (_, i) => ({
          [`.animated-delay-${i}s`]: { animationDelay: `${i}s` },
        })),
        // 0.1, 1.2, ... ( 小数 )
        // 0.1ms, 1.2ms, ... ( 小数 )
        ...Array.from({ length: 67 }, (_, i) => ({
          [`.animated-delay-${i}\\.${removeLastZero(i + 1)},\n.animated-delay-${i}\\.${removeLastZero(i + 1)}ms`]: { animationDelay: `${i}.${removeLastZero(i + 1)}ms` },
        })),
        // 0s ~ 66s
        ...Array.from({ length: 67 }, (_, i) => ({
          [`.animated-delay-${i}\\.${removeLastZero(i + 1)}s`]: { animationDelay: `${i}.${removeLastZero(i + 1)}s` },
        })),
      ),
    );
  });

  test('autocomplete', async () => {
    expect(
      await autocomplete.suggest('animated'),
    ).toMatchSnapshot();

    expect(
      await autocomplete.suggest('animated-repeat-'),
    ).toMatchSnapshot();

    expect(
      await autocomplete.suggest('animated-delay-'),
    ).toMatchSnapshot();
  });
});
