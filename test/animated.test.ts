import { createGenerator, presetAttributify, presetUno } from 'unocss';
import { describe, expect, test } from 'vitest';
import { createAutocomplete } from '@unocss/autocomplete';
import postcss from 'postcss';
import postcssJs from 'postcss-js';
import { durationShortcuts } from '../src/rules/animated';
import animated from '../src/rules/animated.json';
import { removeLastZero } from './utils';
import { presetExtra } from '@/index';

describe('animated.json', () => {
  test('数据的 key 均为 kebabCase 格式', () => {
    Object.keys(animated).forEach((key) => {
      expect(/^[a-z-]+$/.test(key)).is.true;
    });
  });

  test('动画名称为 une 开头的 camelCase 格式', () => {
    Object.values(animated).forEach(({ animationName, css }) => {
      expect(/^une[A-Z]/.test(animationName)).is.true;
      expect(/^une[A-Z]/.test(css['animation-name'])).is.true;
    });
  });

  test('样式名为 kebabCase 格式', () => {
    Object.values(animated).forEach(({ css }) => {
      Object.keys(css).forEach((key) => {
        expect(/^[a-z-]+$/.test(key)).is.true;
      });
    });
  });
});

describe('animated', () => {
  const generator = createGenerator({
    presets: [
      presetUno(),
      presetAttributify(),
      presetExtra(),
    ],
  });

  test('animated', async () => {
    const { css } = await generator.generate('animated', { preflights: false });

    expect(
      postcssJs.objectify(postcss.parse(css)),
    ).toEqual({
      '.animated': {
        '--une-animated-duration': '1s',
        'animationDuration': 'var(--une-animated-duration)',
        'animationFillMode': 'both',
      },
    });
  });

  test('animated-name', async () => {
    const { css } = await generator.generate(
      Object.keys(animated).map(k => `animated-${k}`).join(' '),
      { preflights: false },
    );

    const styles = postcssJs.objectify(postcss.parse(css));

    // 均生成了 css 样式及 @keyframes
    Object.entries(animated).forEach(([key, { animationName }]) => {
      expect(styles[`.animated-${key}`]).toBeDefined();
      expect(styles[`@keyframes ${animationName}`]).toBeDefined();
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
    `, {
      preflights: false,
    });

    expect(
      postcssJs.objectify(postcss.parse(css)),
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
    `, {
      preflights: false,
    });

    expect(css).toMatchSnapshot();
  });

  test('animated-duration', async () => {
    const { css } = await generator.generate(`
      animated-duration-none
      ${/* shortcuts */ Object.keys(durationShortcuts).map(k => `animated-${k}`).join(' ')}
      ${/* 0 ~ 66 */ Array.from({ length: 67 }, (_, i) => `animated-duration-${i}`).join(' ')}
      ${/* 0ms ~ 66ms */ Array.from({ length: 67 }, (_, i) => `animated-duration-${i}ms`).join(' ')}
      ${/* 0s ~ 66s */ Array.from({ length: 67 }, (_, i) => `animated-duration-${i}s`).join(' ')}
      ${/* 0.1, 1.2, ... ( 小数 ) */ Array.from({ length: 67 }, (_, i) => `animated-duration-${i}.${removeLastZero(i + 1)}`).join(' ')}
      ${/* 0.1ms, 1.2ms, ... ( 小数 ) */ Array.from({ length: 67 }, (_, i) => `animated-duration-${i}.${removeLastZero(i + 1)}ms`).join(' ')}
      ${/* 0.1s, 1.2s, ... ( 小数 ) */ Array.from({ length: 67 }, (_, i) => `animated-duration-${i}.${removeLastZero(i + 1)}s`).join(' ')}
    `, {
      preflights: false,
    });

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

    expect(await autocomplete.suggest('animated')).toMatchSnapshot();

    expect(await autocomplete.suggest('animated-')).toMatchSnapshot();

    expect(await autocomplete.suggest('animated-repeat-')).toMatchSnapshot();

    expect(await autocomplete.suggest('animated-delay-')).toMatchSnapshot();

    expect(await autocomplete.suggest('animated-duration-')).toMatchSnapshot();
  });
});
