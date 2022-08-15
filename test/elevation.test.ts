import { createGenerator, presetAttributify, presetUno } from 'unocss';
import { describe, expect, test } from 'vitest';
import { createAutocomplete } from '@unocss/autocomplete';
import { omit } from 'lodash-es';
import postcss from 'postcss';
import postcssJs from 'postcss-js';
import { presetExtra } from '@/index';
import { ambient, ambientOpacity, penumbra, penumbraOpacity, umbra, umbraOpacity } from '@/rules/elevation';

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
        boxShadow: `${umbra[index]} rgba(0, 0, 0, ${umbraOpacity}), `
                    + `${penumbra[index]} rgba(0, 0, 0, ${penumbraOpacity}), `
                    + `${ambient[index]} rgba(0, 0, 0, ${ambientOpacity})`,
      },
    };
  }));

  const elevationFadeRules = Object.assign({}, ...Array.from({ length: 25 }).map((_, index) => {
    return {
      [`.elevation-${index}-fade`]: {
        boxShadow: `${umbra[index]} rgba(0, 0, 0, ${umbraOpacity * 0.5}), `
                    + `${penumbra[index]} rgba(0, 0, 0, ${penumbraOpacity * 0.5}), `
                    + `${ambient[index]} rgba(0, 0, 0, ${ambientOpacity * 0.5})`,
      },
    };
  }));

  test('elevation-*', async () => {
    const { css } = await generator.generate(
      Array.from({ length: 25 }).map((_, i) => `elevation-${i}`).join(' '),
    );

    expect(
      removeUnusedItems(
        postcssJs.objectify(postcss.parse(css)),
      ),
    ).toEqual(
      elevationRules,
    );
  });

  test('elevation-*-fade', async () => {
    const { css } = await generator.generate(
      Array.from({ length: 25 }).map((_, i) => `elevation-${i}-fade`).join(' '),
    );

    expect(
      removeUnusedItems(
        postcssJs.objectify(postcss.parse(css)),
      ),
    ).toEqual(
      elevationFadeRules,
    );
  });

  test('shadow-elevation-*', async () => {
    const { css } = await generator.generate(
      Array.from({ length: 25 }).map((_, i) => `shadow-elevation-${i}`).join(' '),
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

  test('shadow-elevation-*-fade', async () => {
    const { css } = await generator.generate(
      Array.from({ length: 25 }).map((_, i) => `shadow-elevation-${i}-fade`).join(' '),
    );

    expect(
      removeUnusedItems(
        postcssJs.objectify(postcss.parse(css)),
      ),
    ).toEqual(
      Object.fromEntries(
        Object.entries(elevationFadeRules).map(([key, value]) => {
          return [key.replace('.elevation', '.shadow-elevation'), value];
        }),
      ),
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
