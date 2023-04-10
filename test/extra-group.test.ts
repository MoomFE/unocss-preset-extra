import { createGenerator, presetAttributify, presetUno } from 'unocss';
import { describe, expect, test } from 'vitest';
import { createAutocomplete } from '@unocss/autocomplete';
import { isString } from '@moomfe/small-utils';
import postcss from 'postcss';
import postcssJs from 'postcss-js';
import { alignments, justifies, orders, placements } from '@unocss/preset-mini/dist/rules';
import { extraGroupRules } from '@@/src/rules/extra-group';
import { presetExtra } from '@/index';

describe('extra-group', () => {
  const generator = createGenerator({
    presets: [
      presetUno(),
      presetAttributify(),
      presetExtra(),
    ],
  });

  function addDisturbance(css: string) {
    return css.split(' ').map(s => `${s} z${s}w`).join(' ');
  }

  test('justifies', async () => {
    const staticJustifies = justifies.filter(([k]) => isString(k));
    const cssInput = addDisturbance(staticJustifies.map(([key]) => key).join(' '));
    const flexCssInput = addDisturbance(staticJustifies.map(([key]) => `flex-${key}`).join(' '));
    const gridCssInput = addDisturbance(staticJustifies.map(([key]) => `grid-${key}`).join(' '));
    const inlineFlexCssInput = addDisturbance(staticJustifies.map(([key]) => `inline-flex-${key}`).join(' '));
    const inlineGridCssInput = addDisturbance(staticJustifies.map(([key]) => `inline-grid-${key}`).join(' '));

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
    expect(css).toMatchSnapshot();
  });

  test('orders', async () => {
    const staticOrders = orders.filter(([k]) => isString(k));
    const cssInput = addDisturbance(staticOrders.map(([key]) => key).join(' ').concat(' order-1 order-2 order-6 order-12'));
    const flexCssInput = addDisturbance(staticOrders.map(([key]) => `flex-${key}`).join(' ').concat(' flex-order-1 flex-order-2 flex-order-6 flex-order-12'));
    const gridCssInput = addDisturbance(staticOrders.map(([key]) => `grid-${key}`).join(' ').concat(' grid-order-1 grid-order-2 grid-order-6 grid-order-12'));
    const inlineFlexCssInput = addDisturbance(staticOrders.map(([key]) => `inline-flex-${key}`).join(' ').concat(' inline-flex-order-1 inline-flex-order-2 inline-flex-order-6 inline-flex-order-12'));
    const inlineGridCssInput = addDisturbance(staticOrders.map(([key]) => `inline-grid-${key}`).join(' ').concat(' inline-grid-order-1 inline-grid-order-2 inline-grid-order-6 inline-grid-order-12'));

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
    expect(css).toMatchSnapshot();
  });

  test('alignments', async () => {
    const staticAlignments = alignments.filter(([k]) => isString(k));
    const cssInput = addDisturbance(staticAlignments.map(([key]) => key).join(' '));
    const flexCssInput = addDisturbance(staticAlignments.map(([key]) => `flex-${key}`).join(' '));
    const gridCssInput = addDisturbance(staticAlignments.map(([key]) => `grid-${key}`).join(' '));
    const inlineFlexCssInput = addDisturbance(staticAlignments.map(([key]) => `inline-flex-${key}`).join(' '));
    const inlineGridCssInput = addDisturbance(staticAlignments.map(([key]) => `inline-grid-${key}`).join(' '));

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
    expect(css).toMatchSnapshot();
  });

  test('placements', async () => {
    const staticPlacements = placements.filter(([k]) => isString(k));
    const cssInput = addDisturbance(staticPlacements.map(([key]) => key).join(' '));
    const flexCssInput = addDisturbance(staticPlacements.map(([key]) => `flex-${key}`).join(' '));
    const gridCssInput = addDisturbance(staticPlacements.map(([key]) => `grid-${key}`).join(' '));
    const inlineFlexCssInput = addDisturbance(staticPlacements.map(([key]) => `inline-flex-${key}`).join(' '));
    const inlineGridCssInput = addDisturbance(staticPlacements.map(([key]) => `inline-grid-${key}`).join(' '));

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
    expect(css).toMatchSnapshot();
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
