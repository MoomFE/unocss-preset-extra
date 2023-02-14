import { type Rule } from 'unocss';
import { type Theme } from '@unocss/preset-mini';
import { alignments, justifies, orders, placements } from '@unocss/preset-mini/dist/rules';

// @ts-expect-error
export const extraGroupRules: Rule<Theme>[] = [
  // (flex|grid)-justify-*
  ...justifies.map(([key, style]) => [`flex-${key}`, style]),
  ...justifies.map(([key, style]) => [`grid-${key}`, style]),

  // (flex|grid)-order-*
  ...orders.map(([key, style]) => [`flex-${key}`, style]),
  ...orders.map(([key, style]) => [`grid-${key}`, style]),

  // (flex|grid)-content-*
  // (flex|grid)-items-*
  // (flex|grid)-self-*
  ...alignments.map(([key, style]) => [`flex-${key}`, style]),
  ...alignments.map(([key, style]) => [`grid-${key}`, style]),

  // (flex|grid)-place-content-*
  // (flex|grid)-place-items-*
  // (flex|grid)-place-self-*
  ...placements.map(([key, style]) => [`flex-${key}`, style]),
  ...placements.map(([key, style]) => [`grid-${key}`, style]),
];
