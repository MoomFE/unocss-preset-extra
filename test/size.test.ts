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

describe('size', () => {
  const generator = createGenerator({
    presets: [
      presetUno(),
      presetAttributify(),
      presetExtra(),
    ],
  });

  const autocomplete = createAutocomplete(generator);

  test('自动宽高, 屏幕宽高', async () => {
    const { css } = await generator.generate(
      ['auto', 'screen'].map(s => `size-${s}`).join(' '),
    );
    const { css: minCss } = await generator.generate(
      ['auto', 'screen'].map(s => `min-size-${s}`).join(' '),
    );
    const { css: maxCss } = await generator.generate(
      ['auto', 'screen'].map(s => `max-size-${s}`).join(' '),
    );

    expect(
      removeUnusedItems({
        ...postcssJs.objectify(postcss.parse(css)),
        ...postcssJs.objectify(postcss.parse(minCss)),
        ...postcssJs.objectify(postcss.parse(maxCss)),
      }),
    ).toEqual({
      '.size-auto': { width: 'auto', height: 'auto' },
      '.size-screen': { width: '100vw', height: '100vh' },

      '.min-size-auto': { minWidth: 'auto', minHeight: 'auto' },
      '.min-size-screen': { minWidth: '100vw', minHeight: '100vh' },

      '.max-size-auto': { maxWidth: 'auto', maxHeight: 'auto' },
      '.max-size-screen': { maxWidth: '100vw', maxHeight: '100vh' },
    });
  });

  test('百分比宽高', async () => {
    const { css } = await generator.generate(
      ['1/2', '1/4', '1/10', 'full'].map(s => `size-${s}`).join(' '),
    );
    const { css: minCss } = await generator.generate(
      ['1/2', '1/4', '1/10', 'full'].map(s => `min-size-${s}`).join(' '),
    );
    const { css: maxCss } = await generator.generate(
      ['1/2', '1/4', '1/10', 'full'].map(s => `max-size-${s}`).join(' '),
    );

    expect(
      removeUnusedItems({
        ...postcssJs.objectify(postcss.parse(css)),
        ...postcssJs.objectify(postcss.parse(minCss)),
        ...postcssJs.objectify(postcss.parse(maxCss)),
      }),
    ).toEqual({
      '.size-1\\/2': { width: '50%', height: '50%' },
      '.size-1\\/4': { width: '25%', height: '25%' },
      '.size-1\\/10': { width: '10%', height: '10%' },
      '.size-full': { width: '100%', height: '100%' },

      '.min-size-1\\/2': { minWidth: '50%', minHeight: '50%' },
      '.min-size-1\\/4': { minWidth: '25%', minHeight: '25%' },
      '.min-size-1\\/10': { minWidth: '10%', minHeight: '10%' },
      '.min-size-full': { minWidth: '100%', minHeight: '100%' },

      '.max-size-1\\/2': { maxWidth: '50%', maxHeight: '50%' },
      '.max-size-1\\/4': { maxWidth: '25%', maxHeight: '25%' },
      '.max-size-1\\/10': { maxWidth: '10%', maxHeight: '10%' },
      '.max-size-full': { maxWidth: '100%', maxHeight: '100%' },
    });
  });

  test('固定宽高', async () => {
    const { css } = await generator.generate(
      [
        '1', '2', '3', '666',
        'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl',
      ].map(s => `size-${s}`).join(' '),
    );
    const { css: minCss } = await generator.generate(
      [
        '1', '2', '3', '666',
        'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl',
      ].map(s => `min-size-${s}`).join(' '),
    );
    const { css: maxCss } = await generator.generate(
      [
        '1', '2', '3', '666',
        'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl',
      ].map(s => `max-size-${s}`).join(' '),
    );

    expect(
      removeUnusedItems({
        ...postcssJs.objectify(postcss.parse(css)),
        ...postcssJs.objectify(postcss.parse(minCss)),
        ...postcssJs.objectify(postcss.parse(maxCss)),
      }),
    ).toEqual({
      '.size-1': { width: '0.25rem', height: '0.25rem' },
      '.size-2': { width: '0.5rem', height: '0.5rem' },
      '.size-3': { width: '0.75rem', height: '0.75rem' },
      '.size-666': { width: '166.5rem', height: '166.5rem' },
      '.size-xs': { width: '20rem', height: '20rem' },
      '.size-sm': { width: '24rem', height: '24rem' },
      '.size-md': { width: '28rem', height: '28rem' },
      '.size-lg': { width: '32rem', height: '32rem' },
      '.size-xl': { width: '36rem', height: '36rem' },
      '.size-2xl': { width: '42rem', height: '42rem' },
      '.size-3xl': { width: '48rem', height: '48rem' },
      '.size-4xl': { width: '56rem', height: '56rem' },
      '.size-5xl': { width: '64rem', height: '64rem' },
      '.size-6xl': { width: '72rem', height: '72rem' },
      '.size-7xl': { width: '80rem', height: '80rem' },

      '.min-size-1': { minWidth: '0.25rem', minHeight: '0.25rem' },
      '.min-size-2': { minWidth: '0.5rem', minHeight: '0.5rem' },
      '.min-size-3': { minWidth: '0.75rem', minHeight: '0.75rem' },
      '.min-size-666': { minWidth: '166.5rem', minHeight: '166.5rem' },
      '.min-size-xs': { minWidth: '20rem', minHeight: '20rem' },
      '.min-size-sm': { minWidth: '24rem', minHeight: '24rem' },
      '.min-size-md': { minWidth: '28rem', minHeight: '28rem' },
      '.min-size-lg': { minWidth: '32rem', minHeight: '32rem' },
      '.min-size-xl': { minWidth: '36rem', minHeight: '36rem' },
      '.min-size-2xl': { minWidth: '42rem', minHeight: '42rem' },
      '.min-size-3xl': { minWidth: '48rem', minHeight: '48rem' },
      '.min-size-4xl': { minWidth: '56rem', minHeight: '56rem' },
      '.min-size-5xl': { minWidth: '64rem', minHeight: '64rem' },
      '.min-size-6xl': { minWidth: '72rem', minHeight: '72rem' },
      '.min-size-7xl': { minWidth: '80rem', minHeight: '80rem' },

      '.max-size-1': { maxWidth: '0.25rem', maxHeight: '0.25rem' },
      '.max-size-2': { maxWidth: '0.5rem', maxHeight: '0.5rem' },
      '.max-size-3': { maxWidth: '0.75rem', maxHeight: '0.75rem' },
      '.max-size-666': { maxWidth: '166.5rem', maxHeight: '166.5rem' },
      '.max-size-xs': { maxWidth: '20rem', maxHeight: '20rem' },
      '.max-size-sm': { maxWidth: '24rem', maxHeight: '24rem' },
      '.max-size-md': { maxWidth: '28rem', maxHeight: '28rem' },
      '.max-size-lg': { maxWidth: '32rem', maxHeight: '32rem' },
      '.max-size-xl': { maxWidth: '36rem', maxHeight: '36rem' },
      '.max-size-2xl': { maxWidth: '42rem', maxHeight: '42rem' },
      '.max-size-3xl': { maxWidth: '48rem', maxHeight: '48rem' },
      '.max-size-4xl': { maxWidth: '56rem', maxHeight: '56rem' },
      '.max-size-5xl': { maxWidth: '64rem', maxHeight: '64rem' },
      '.max-size-6xl': { maxWidth: '72rem', maxHeight: '72rem' },
      '.max-size-7xl': { maxWidth: '80rem', maxHeight: '80rem' },
    });
  });

  test('自定义宽高', async () => {
    const { css } = await generator.generate(
      ['1px', '1pt', '1pc', '1rem', '1em', '1%', '1vh', '1vw', '1in', '1cm', '1mm', '1ex', '1ch', '1vmin', '1vmax', '1rpx'].map(s => `size-[${s}]`).join(' '),
    );
    const { css: minCss } = await generator.generate(
      ['1px', '1pt', '1pc', '1rem', '1em', '1%', '1vh', '1vw', '1in', '1cm', '1mm', '1ex', '1ch', '1vmin', '1vmax', '1rpx'].map(s => `min-size-[${s}]`).join(' '),
    );
    const { css: maxCss } = await generator.generate(
      ['1px', '1pt', '1pc', '1rem', '1em', '1%', '1vh', '1vw', '1in', '1cm', '1mm', '1ex', '1ch', '1vmin', '1vmax', '1rpx'].map(s => `max-size-[${s}]`).join(' '),
    );

    expect(
      removeUnusedItems({
        ...postcssJs.objectify(postcss.parse(css)),
        ...postcssJs.objectify(postcss.parse(minCss)),
        ...postcssJs.objectify(postcss.parse(maxCss)),
      }),
    ).toEqual({
      '.size-\\[1px\\]': { width: '1px', height: '1px' },
      '.size-\\[1pt\\]': { width: '1pt', height: '1pt' },
      '.size-\\[1pc\\]': { width: '1pc', height: '1pc' },
      '.size-\\[1rem\\]': { width: '1rem', height: '1rem' },
      '.size-\\[1em\\]': { width: '1em', height: '1em' },
      '.size-\\[1\\%\\]': { width: '1%', height: '1%' },
      '.size-\\[1vh\\]': { width: '1vh', height: '1vh' },
      '.size-\\[1vw\\]': { width: '1vw', height: '1vw' },
      '.size-\\[1in\\]': { width: '1in', height: '1in' },
      '.size-\\[1cm\\]': { width: '1cm', height: '1cm' },
      '.size-\\[1mm\\]': { width: '1mm', height: '1mm' },
      '.size-\\[1ex\\]': { width: '1ex', height: '1ex' },
      '.size-\\[1ch\\]': { width: '1ch', height: '1ch' },
      '.size-\\[1vmin\\]': { width: '1vmin', height: '1vmin' },
      '.size-\\[1vmax\\]': { width: '1vmax', height: '1vmax' },
      '.size-\\[1rpx\\]': { width: '1rpx', height: '1rpx' },

      '.min-size-\\[1px\\]': { minWidth: '1px', minHeight: '1px' },
      '.min-size-\\[1pt\\]': { minWidth: '1pt', minHeight: '1pt' },
      '.min-size-\\[1pc\\]': { minWidth: '1pc', minHeight: '1pc' },
      '.min-size-\\[1rem\\]': { minWidth: '1rem', minHeight: '1rem' },
      '.min-size-\\[1em\\]': { minWidth: '1em', minHeight: '1em' },
      '.min-size-\\[1\\%\\]': { minWidth: '1%', minHeight: '1%' },
      '.min-size-\\[1vh\\]': { minWidth: '1vh', minHeight: '1vh' },
      '.min-size-\\[1vw\\]': { minWidth: '1vw', minHeight: '1vw' },
      '.min-size-\\[1in\\]': { minWidth: '1in', minHeight: '1in' },
      '.min-size-\\[1cm\\]': { minWidth: '1cm', minHeight: '1cm' },
      '.min-size-\\[1mm\\]': { minWidth: '1mm', minHeight: '1mm' },
      '.min-size-\\[1ex\\]': { minWidth: '1ex', minHeight: '1ex' },
      '.min-size-\\[1ch\\]': { minWidth: '1ch', minHeight: '1ch' },
      '.min-size-\\[1vmin\\]': { minWidth: '1vmin', minHeight: '1vmin' },
      '.min-size-\\[1vmax\\]': { minWidth: '1vmax', minHeight: '1vmax' },
      '.min-size-\\[1rpx\\]': { minWidth: '1rpx', minHeight: '1rpx' },

      '.max-size-\\[1px\\]': { maxWidth: '1px', maxHeight: '1px' },
      '.max-size-\\[1pt\\]': { maxWidth: '1pt', maxHeight: '1pt' },
      '.max-size-\\[1pc\\]': { maxWidth: '1pc', maxHeight: '1pc' },
      '.max-size-\\[1rem\\]': { maxWidth: '1rem', maxHeight: '1rem' },
      '.max-size-\\[1em\\]': { maxWidth: '1em', maxHeight: '1em' },
      '.max-size-\\[1\\%\\]': { maxWidth: '1%', maxHeight: '1%' },
      '.max-size-\\[1vh\\]': { maxWidth: '1vh', maxHeight: '1vh' },
      '.max-size-\\[1vw\\]': { maxWidth: '1vw', maxHeight: '1vw' },
      '.max-size-\\[1in\\]': { maxWidth: '1in', maxHeight: '1in' },
      '.max-size-\\[1cm\\]': { maxWidth: '1cm', maxHeight: '1cm' },
      '.max-size-\\[1mm\\]': { maxWidth: '1mm', maxHeight: '1mm' },
      '.max-size-\\[1ex\\]': { maxWidth: '1ex', maxHeight: '1ex' },
      '.max-size-\\[1ch\\]': { maxWidth: '1ch', maxHeight: '1ch' },
      '.max-size-\\[1vmin\\]': { maxWidth: '1vmin', maxHeight: '1vmin' },
      '.max-size-\\[1vmax\\]': { maxWidth: '1vmax', maxHeight: '1vmax' },
      '.max-size-\\[1rpx\\]': { maxWidth: '1rpx', maxHeight: '1rpx' },
    });
  });

  test('autocomplete', async () => {
    expect(
      await autocomplete.suggest('size-'),
    ).toMatchSnapshot();

    expect(
      await autocomplete.suggest('min-size-'),
    ).toMatchSnapshot();

    expect(
      await autocomplete.suggest('max-size-'),
    ).toMatchSnapshot();
  });
});
