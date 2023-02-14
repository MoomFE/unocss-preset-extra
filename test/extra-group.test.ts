import { createGenerator, presetAttributify, presetUno } from 'unocss';
import { describe, expect, test } from 'vitest';
import { createAutocomplete } from '@unocss/autocomplete';
import postcss from 'postcss';
import postcssJs from 'postcss-js';
import { alignments, justifies, orders, placements } from '@unocss/preset-mini/dist/rules';
import { removeUnusedCSS } from './utils';
import { presetExtra } from '@/index';

describe('extra-group', () => {
  const generator = createGenerator({
    presets: [
      presetUno(),
      presetAttributify(),
      presetExtra(),
    ],
  });

  test('justifies', async () => {
    const { css } = await generator.generate(
      justifies.map(([key]) => key).join(' '),
    );
    const { css: flexCss } = await generator.generate(
      justifies.map(([key]) => `flex-${key}`).join(' '),
    );
    const { css: gridCss } = await generator.generate(
      justifies.map(([key]) => `grid-${key}`).join(' '),
    );

    const cssJson = removeUnusedCSS(postcssJs.objectify(postcss.parse(css)));
    const flexCssJson = removeUnusedCSS(postcssJs.objectify(postcss.parse(flexCss)));
    const gridCssJson = removeUnusedCSS(postcssJs.objectify(postcss.parse(gridCss)));

    Object.entries(cssJson).forEach(([key, style]) => {
      expect(style).toEqual(flexCssJson[`.flex-${key.slice(1)}`]);
      expect(style).toEqual(gridCssJson[`.grid-${key.slice(1)}`]);
    });
  });

  test('orders', async () => {
    const { css } = await generator.generate(
      orders.map(([key]) => key).join(' '),
    );
    const { css: flexCss } = await generator.generate(
      orders.map(([key]) => `flex-${key}`).join(' '),
    );
    const { css: gridCss } = await generator.generate(
      orders.map(([key]) => `grid-${key}`).join(' '),
    );

    const cssJson = removeUnusedCSS(postcssJs.objectify(postcss.parse(css)));
    const flexCssJson = removeUnusedCSS(postcssJs.objectify(postcss.parse(flexCss)));
    const gridCssJson = removeUnusedCSS(postcssJs.objectify(postcss.parse(gridCss)));

    Object.entries(cssJson).forEach(([key, style]) => {
      expect(style).toEqual(flexCssJson[`.flex-${key.slice(1)}`]);
      expect(style).toEqual(gridCssJson[`.grid-${key.slice(1)}`]);
    });
  });

  test('alignments', async () => {
    const { css } = await generator.generate(
      alignments.map(([key]) => key).join(' '),
    );
    const { css: flexCss } = await generator.generate(
      alignments.map(([key]) => `flex-${key}`).join(' '),
    );
    const { css: gridCss } = await generator.generate(
      alignments.map(([key]) => `grid-${key}`).join(' '),
    );

    const cssJson = removeUnusedCSS(postcssJs.objectify(postcss.parse(css)));
    const flexCssJson = removeUnusedCSS(postcssJs.objectify(postcss.parse(flexCss)));
    const gridCssJson = removeUnusedCSS(postcssJs.objectify(postcss.parse(gridCss)));

    Object.entries(cssJson).forEach(([key, style]) => {
      expect(style).toEqual(flexCssJson[`.flex-${key.slice(1)}`]);
      expect(style).toEqual(gridCssJson[`.grid-${key.slice(1)}`]);
    });
  });

  test('placements', async () => {
    const { css } = await generator.generate(
      placements.map(([key]) => key).join(' '),
    );
    const { css: flexCss } = await generator.generate(
      placements.map(([key]) => `flex-${key}`).join(' '),
    );
    const { css: gridCss } = await generator.generate(
      placements.map(([key]) => `grid-${key}`).join(' '),
    );

    const cssJson = removeUnusedCSS(postcssJs.objectify(postcss.parse(css)));
    const flexCssJson = removeUnusedCSS(postcssJs.objectify(postcss.parse(flexCss)));
    const gridCssJson = removeUnusedCSS(postcssJs.objectify(postcss.parse(gridCss)));

    Object.entries(cssJson).forEach(([key, style]) => {
      expect(style).toEqual(flexCssJson[`.flex-${key.slice(1)}`]);
      expect(style).toEqual(gridCssJson[`.grid-${key.slice(1)}`]);
    });
  });

  test('autocomplete', async () => {
    const autocomplete = createAutocomplete(createGenerator({
      presets: [
        presetUno(),
        presetAttributify(),
        presetExtra(),
      ],
    }));

    // justifies
    expect(await autocomplete.suggest('flex-justify-')).toMatchSnapshot();
    expect(await autocomplete.suggest('grid-justify-')).toMatchSnapshot();

    // orders
    expect(await autocomplete.suggest('flex-order-')).toMatchSnapshot();
    expect(await autocomplete.suggest('grid-order-')).toMatchSnapshot();

    // alignments
    expect(await autocomplete.suggest('flex-content-')).toMatchSnapshot();
    expect(await autocomplete.suggest('flex-items-')).toMatchSnapshot();
    expect(await autocomplete.suggest('flex-self-')).toMatchSnapshot();
    expect(await autocomplete.suggest('grid-content-')).toMatchSnapshot();
    expect(await autocomplete.suggest('grid-items-')).toMatchSnapshot();
    expect(await autocomplete.suggest('grid-self-')).toMatchSnapshot();

    // placements
    expect(await autocomplete.suggest('flex-place-content-')).toMatchSnapshot();
    expect(await autocomplete.suggest('flex-place-items-')).toMatchSnapshot();
    expect(await autocomplete.suggest('flex-place-self-')).toMatchSnapshot();
    expect(await autocomplete.suggest('grid-place-content-')).toMatchSnapshot();
    expect(await autocomplete.suggest('grid-place-items-')).toMatchSnapshot();
    expect(await autocomplete.suggest('grid-place-self-')).toMatchSnapshot();
  });
});
