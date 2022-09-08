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
      ${/* 0 ~ 6 */ Array.from({ length: 7 }, (_, i) => `animated-repeat-${i}`).join(' ')}
      ${/* 10, 100, 1000 */ Array.from({ length: 3 }, (_, i) => `animated-repeat-10${''.padEnd(i, '0')}`).join(' ')}
      ${/* 0.1, 1.2, ... ( 小数 ) */ Array.from({ length: 7 }, (_, i) => `animated-repeat-${i}.${i + 1}`).join(' ')}
      ${/* a ~ z ( 不符合规则的样式类 ) */ Array.from({ length: 26 }, (_, i) => `animated-repeat-${String.fromCharCode(97 + i)}`)}
    `);

    expect(
      removeUnusedItems({
        ...postcssJs.objectify(postcss.parse(css)),
      }),
    ).toEqual(
      Object.assign(
        {
          '.animated-infinite,\n.animated-repeat-infinite': { animationIterationCount: 'infinite' },
        },
        // 0 ~ 6
        ...Array.from({ length: 7 }, (_, i) => ({
          [`.animated-repeat-${i}`]: { animationIterationCount: `${i}` },
        })),
        // 0.1, 1.2, ... ( 小数 )
        ...Array.from({ length: 7 }, (_, i) => ({
          [`.animated-repeat-${i}\\.${i + 1}`]: { animationIterationCount: `${i}.${i + 1}` },
        })),
        // 10, 100, 1000
        ...Array.from({ length: 3 }, (_, i) => ({
          [`.animated-repeat-10${''.padEnd(i, '0')}`]: { animationIterationCount: `10${''.padEnd(i, '0')}` },
        })),
      ),
    );
  });

  test('autocomplete', async () => {
    expect(
      await autocomplete.suggest('animated'),
    ).toMatchSnapshot();
  });
});
