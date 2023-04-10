import { createGenerator, presetAttributify, presetUno } from 'unocss';
import { describe, expect, test } from 'vitest';
import { createAutocomplete } from '@unocss/autocomplete';
import { isString } from '@moomfe/small-utils';
import postcss from 'postcss';
import postcssJs from 'postcss-js';
import { alignments, justifies, orders, placements } from '@unocss/preset-mini/dist/rules';
import { presetExtra } from '@/index';
import { extraGroupRules } from '@/rules/extra-group';

describe('extra-group', () => {
  const generator = createGenerator({
    presets: [
      presetUno(),
      presetAttributify(),
      presetExtra(),
    ],
  });

  test('justifies', async () => {
    const staticJustifies = justifies.filter(([k]) => isString(k));
    const cssInput = staticJustifies.map(([key]) => key).join(' ');
    const flexCssInput = staticJustifies.map(([key]) => `flex-${key}`).join(' ');
    const gridCssInput = staticJustifies.map(([key]) => `grid-${key}`).join(' ');
    const inlineFlexCssInput = staticJustifies.map(([key]) => `inline-flex-${key}`).join(' ');
    const inlineGridCssInput = staticJustifies.map(([key]) => `inline-grid-${key}`).join(' ');

    const { css } = await generator.generate(cssInput, { preflights: false });
    const { css: flexCss } = await generator.generate(flexCssInput, { preflights: false });
    const { css: gridCss } = await generator.generate(gridCssInput, { preflights: false });
    const { css: inlineFlexCss } = await generator.generate(inlineFlexCssInput, { preflights: false });
    const { css: inlineGridCss } = await generator.generate(inlineGridCssInput, { preflights: false });

    const cssJson = postcssJs.objectify(postcss.parse(css));
    const flexCssJson = postcssJs.objectify(postcss.parse(flexCss));
    const gridCssJson = postcssJs.objectify(postcss.parse(gridCss));
    const inlineFlexCssJson = postcssJs.objectify(postcss.parse(inlineFlexCss));
    const inlineGridCssJson = postcssJs.objectify(postcss.parse(inlineGridCss));

    Object.entries(cssJson).forEach(([key, style]) => {
      expect(style).toEqual(flexCssJson[`.flex-${key.slice(1)}`]);
      expect(style).toEqual(gridCssJson[`.grid-${key.slice(1)}`]);
      expect(style).toEqual(inlineFlexCssJson[`.inline-flex-${key.slice(1)}`]);
      expect(style).toEqual(inlineGridCssJson[`.inline-grid-${key.slice(1)}`]);
    });

    expect(`
      ${cssInput}
      ${flexCssInput}
      ${gridCssInput}
      ${inlineFlexCssInput}
      ${inlineGridCssInput}\n`.replaceAll('      ', '  ')).toMatchSnapshot();
  });

  test('orders', async () => {
    const staticOrders = orders.filter(([k]) => isString(k));
    const cssInput = staticOrders.map(([key]) => key).join(' ');
    const flexCssInput = staticOrders.map(([key]) => `flex-${key}`).join(' ');
    const gridCssInput = staticOrders.map(([key]) => `grid-${key}`).join(' ');
    const inlineFlexCssInput = staticOrders.map(([key]) => `inline-flex-${key}`).join(' ');
    const inlineGridCssInput = staticOrders.map(([key]) => `inline-grid-${key}`).join(' ');

    const { css } = await generator.generate(cssInput, { preflights: false });
    const { css: flexCss } = await generator.generate(flexCssInput, { preflights: false });
    const { css: gridCss } = await generator.generate(gridCssInput, { preflights: false });
    const { css: inlineFlexCss } = await generator.generate(inlineFlexCssInput, { preflights: false });
    const { css: inlineGridCss } = await generator.generate(inlineGridCssInput, { preflights: false });

    const cssJson = postcssJs.objectify(postcss.parse(css));
    const flexCssJson = postcssJs.objectify(postcss.parse(flexCss));
    const gridCssJson = postcssJs.objectify(postcss.parse(gridCss));
    const inlineFlexCssJson = postcssJs.objectify(postcss.parse(inlineFlexCss));
    const inlineGridCssJson = postcssJs.objectify(postcss.parse(inlineGridCss));

    Object.entries(cssJson).forEach(([key, style]) => {
      expect(style).toEqual(flexCssJson[`.flex-${key.slice(1)}`]);
      expect(style).toEqual(gridCssJson[`.grid-${key.slice(1)}`]);
      expect(style).toEqual(inlineFlexCssJson[`.inline-flex-${key.slice(1)}`]);
      expect(style).toEqual(inlineGridCssJson[`.inline-grid-${key.slice(1)}`]);
    });

    expect(`
      ${cssInput}
      ${flexCssInput}
      ${gridCssInput}
      ${inlineFlexCssInput}
      ${inlineGridCssInput}\n`.replaceAll('      ', '  ')).toMatchSnapshot();
  });

  test('alignments', async () => {
    const staticAlignments = alignments.filter(([k]) => isString(k));
    const cssInput = staticAlignments.map(([key]) => key).join(' ');
    const flexCssInput = staticAlignments.map(([key]) => `flex-${key}`).join(' ');
    const gridCssInput = staticAlignments.map(([key]) => `grid-${key}`).join(' ');
    const inlineFlexCssInput = staticAlignments.map(([key]) => `inline-flex-${key}`).join(' ');
    const inlineGridCssInput = staticAlignments.map(([key]) => `inline-grid-${key}`).join(' ');

    const { css } = await generator.generate(cssInput, { preflights: false });
    const { css: flexCss } = await generator.generate(flexCssInput, { preflights: false });
    const { css: gridCss } = await generator.generate(gridCssInput, { preflights: false });
    const { css: inlineFlexCss } = await generator.generate(inlineFlexCssInput, { preflights: false });
    const { css: inlineGridCss } = await generator.generate(inlineGridCssInput, { preflights: false });

    const cssJson = postcssJs.objectify(postcss.parse(css));
    const flexCssJson = postcssJs.objectify(postcss.parse(flexCss));
    const gridCssJson = postcssJs.objectify(postcss.parse(gridCss));
    const inlineFlexCssJson = postcssJs.objectify(postcss.parse(inlineFlexCss));
    const inlineGridCssJson = postcssJs.objectify(postcss.parse(inlineGridCss));

    Object.entries(cssJson).forEach(([key, style]) => {
      expect(style).toEqual(flexCssJson[`.flex-${key.slice(1)}`]);
      expect(style).toEqual(gridCssJson[`.grid-${key.slice(1)}`]);
      expect(style).toEqual(inlineFlexCssJson[`.inline-flex-${key.slice(1)}`]);
      expect(style).toEqual(inlineGridCssJson[`.inline-grid-${key.slice(1)}`]);
    });

    expect(`
      ${cssInput}
      ${flexCssInput}
      ${gridCssInput}
      ${inlineFlexCssInput}
      ${inlineGridCssInput}\n`.replaceAll('      ', '  ')).toMatchSnapshot();
  });

  test('placements', async () => {
    const staticPlacements = placements.filter(([k]) => isString(k));
    const cssInput = staticPlacements.map(([key]) => key).join(' ');
    const flexCssInput = staticPlacements.map(([key]) => `flex-${key}`).join(' ');
    const gridCssInput = staticPlacements.map(([key]) => `grid-${key}`).join(' ');
    const inlineFlexCssInput = staticPlacements.map(([key]) => `inline-flex-${key}`).join(' ');
    const inlineGridCssInput = staticPlacements.map(([key]) => `inline-grid-${key}`).join(' ');

    const { css } = await generator.generate(cssInput, { preflights: false });
    const { css: flexCss } = await generator.generate(flexCssInput, { preflights: false });
    const { css: gridCss } = await generator.generate(gridCssInput, { preflights: false });
    const { css: inlineFlexCss } = await generator.generate(inlineFlexCssInput, { preflights: false });
    const { css: inlineGridCss } = await generator.generate(inlineGridCssInput, { preflights: false });

    const cssJson = postcssJs.objectify(postcss.parse(css));
    const flexCssJson = postcssJs.objectify(postcss.parse(flexCss));
    const gridCssJson = postcssJs.objectify(postcss.parse(gridCss));
    const inlineFlexCssJson = postcssJs.objectify(postcss.parse(inlineFlexCss));
    const inlineGridCssJson = postcssJs.objectify(postcss.parse(inlineGridCss));

    Object.entries(cssJson).forEach(([key, style]) => {
      expect(style).toEqual(flexCssJson[`.flex-${key.slice(1)}`]);
      expect(style).toEqual(gridCssJson[`.grid-${key.slice(1)}`]);
      expect(style).toEqual(inlineFlexCssJson[`.inline-flex-${key.slice(1)}`]);
      expect(style).toEqual(inlineGridCssJson[`.inline-grid-${key.slice(1)}`]);
    });

    expect(`
      ${cssInput}
      ${flexCssInput}
      ${gridCssInput}
      ${inlineFlexCssInput}
      ${inlineGridCssInput}\n`.replaceAll('      ', '  ')).toMatchSnapshot();
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
    expect(await autocomplete.suggest('inline-flex-justify-')).toMatchSnapshot();
    expect(await autocomplete.suggest('inline-grid-justify-')).toMatchSnapshot();

    // orders
    expect(await autocomplete.suggest('flex-order-')).toMatchSnapshot();
    expect(await autocomplete.suggest('grid-order-')).toMatchSnapshot();
    expect(await autocomplete.suggest('inline-flex-order-')).toMatchSnapshot();
    expect(await autocomplete.suggest('inline-grid-order-')).toMatchSnapshot();

    // alignments
    expect(await autocomplete.suggest('flex-content-')).toMatchSnapshot();
    expect(await autocomplete.suggest('flex-items-')).toMatchSnapshot();
    expect(await autocomplete.suggest('flex-self-')).toMatchSnapshot();
    expect(await autocomplete.suggest('grid-content-')).toMatchSnapshot();
    expect(await autocomplete.suggest('grid-items-')).toMatchSnapshot();
    expect(await autocomplete.suggest('grid-self-')).toMatchSnapshot();
    expect(await autocomplete.suggest('inline-flex-content-')).toMatchSnapshot();
    expect(await autocomplete.suggest('inline-flex-items-')).toMatchSnapshot();
    expect(await autocomplete.suggest('inline-flex-self-')).toMatchSnapshot();
    expect(await autocomplete.suggest('inline-grid-content-')).toMatchSnapshot();
    expect(await autocomplete.suggest('inline-grid-items-')).toMatchSnapshot();
    expect(await autocomplete.suggest('inline-grid-self-')).toMatchSnapshot();

    // placements
    expect(await autocomplete.suggest('flex-place-content-')).toMatchSnapshot();
    expect(await autocomplete.suggest('flex-place-items-')).toMatchSnapshot();
    expect(await autocomplete.suggest('flex-place-self-')).toMatchSnapshot();
    expect(await autocomplete.suggest('grid-place-content-')).toMatchSnapshot();
    expect(await autocomplete.suggest('grid-place-items-')).toMatchSnapshot();
    expect(await autocomplete.suggest('grid-place-self-')).toMatchSnapshot();
    expect(await autocomplete.suggest('inline-flex-place-content-')).toMatchSnapshot();
    expect(await autocomplete.suggest('inline-flex-place-items-')).toMatchSnapshot();
    expect(await autocomplete.suggest('inline-flex-place-self-')).toMatchSnapshot();
    expect(await autocomplete.suggest('inline-grid-place-content-')).toMatchSnapshot();
    expect(await autocomplete.suggest('inline-grid-place-items-')).toMatchSnapshot();
    expect(await autocomplete.suggest('inline-grid-place-self-')).toMatchSnapshot();
  });

  test('rules', () => {
    expect(
      extraGroupRules.map(rule => rule[0]),
    ).toMatchSnapshot();
  });
});
