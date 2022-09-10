import { type CSSObject, type Rule } from 'unocss';
import { type Theme } from '@unocss/preset-mini';
import { handler } from '@unocss/preset-mini/utils';
import animatedJSON from './animated.json';

function getAnimated() {
  return animatedJSON as unknown as {
    [key: string]: {
      animationName: string
      css: CSSObject
      keyframes: string
    }
  };
}

export const durationShortcuts = {
  faster: 0.5,
  fast: 0.8,
  slow: 2,
  slower: 3,
};

/**
 * animate.css
 */
export const animatedRules: Rule<Theme>[] = [
  [
    /^animated$/,
    () => {
      return {
        '--une-animated-duration': '1s',
        'animation-duration': 'var(--une-animated-duration)',
        'animation-fill-mode': 'both',
      };
    },
    {
      autocomplete: ['animated'],
    },
  ],
  [
    new RegExp(`^animated-(${Object.keys(animatedJSON).join('|')})$`),
    ([, name]) => {
      const { animationName, css, keyframes } = getAnimated()[name];

      return [
        `@keyframes ${animationName} { ${keyframes} }`,
        css,
      ];
    },
    {
      autocomplete: [
        `animated-(${Object.keys(animatedJSON).join('|')})`,
      ],
    },
  ],
  [
    /^animated-(infinite|(repeat-(infinite|(\d+(\.\d+)?))))$/,
    ([,,, repeat]) => {
      const isInfinite = !repeat || repeat === 'infinite';

      return {
        'animation-iteration-count': isInfinite ? 'infinite' : repeat,
      };
    },
    {
      autocomplete: [
        'animated-infinite',
        'animated-repeat-infinite',
        'animated-repeat-<num>',
      ],
    },
  ],
  [
    /^animated-delay-(none|(\d+(\.\d+)?(m?s)?))$/,
    ([, d]) => ({
      'animation-delay': d === 'none' ? '0ms' : handler.bracket.cssvar.time(d),
    }),
    {
      autocomplete: [
        'animated-delay-none',
        'animated-delay-$duration',
      ],
    },
  ],
  [
    /^animated-(((fast|slow)(?:er)?)|duration-(none|(\d+(\.\d+)?(m?s)?)))/,
    ([_,, shortcut,, v]) => {
      if (shortcut) {
        return {
          'animation-duration': `calc(var(--une-animated-duration) * ${durationShortcuts[shortcut as keyof typeof durationShortcuts]});`,
        };
      }

      return {
        'animation-duration': v === 'none' ? '0ms' : handler.bracket.cssvar.time(v),
      };
    },
    {
      autocomplete: [
        `animated-(${Object.keys(durationShortcuts).join('|')})`,
        'animated-duration-none',
        'animated-duration-$duration',
      ],
    },
  ],
];
