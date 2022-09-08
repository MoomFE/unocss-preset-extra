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
      animated-repeat-0 animated-repeat-1 animated-repeat-2 animated-repeat-3
      animated-repeat-4 animated-repeat-5 animated-repeat-6
      animated-repeat-10 animated-repeat-100 animated-repeat-1000
    `);

    expect(
      removeUnusedItems({
        ...postcssJs.objectify(postcss.parse(css)),
      }),
    ).toEqual({
      '.animated-infinite,\n.animated-repeat-infinite': { animationIterationCount: 'infinite' },
      '.animated-repeat-0': { animationIterationCount: '0' },
      '.animated-repeat-1': { animationIterationCount: '1' },
      '.animated-repeat-2': { animationIterationCount: '2' },
      '.animated-repeat-3': { animationIterationCount: '3' },
      '.animated-repeat-4': { animationIterationCount: '4' },
      '.animated-repeat-5': { animationIterationCount: '5' },
      '.animated-repeat-6': { animationIterationCount: '6' },
      '.animated-repeat-10': { animationIterationCount: '10' },
      '.animated-repeat-100': { animationIterationCount: '100' },
      '.animated-repeat-1000': { animationIterationCount: '1000' },
    });
  });

  test('autocomplete', async () => {
    expect(
      await autocomplete.suggest('animated'),
    ).toMatchSnapshot();
  });
});
