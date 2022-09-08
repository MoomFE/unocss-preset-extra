import { type Rule } from 'unocss';

/**
 * animate.css
 */
export const animatedRules: Rule[] = [
  [
    /^animated$/,
    () => {
      return {
        'animation-duration': '1s',
        'animation-fill-mode': 'both',
      };
    },
  ],
  [
    /^animated-(infinite|(repeat-(infinite|(\d+(.\d+)?))))$/,
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
];
