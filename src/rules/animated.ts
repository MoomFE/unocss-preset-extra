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
  // [
  //   /^animated-(infinite|(repeat-(infinite|\d+)))$/,
  //   () => {},
  // ],
];
