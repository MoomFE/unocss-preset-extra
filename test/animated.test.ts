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

  test('autocomplete', async () => {
    expect(
      await autocomplete.suggest('animated'),
    ).toMatchSnapshot();
  });
});
