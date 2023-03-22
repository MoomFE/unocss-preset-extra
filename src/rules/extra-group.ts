import { type Rule } from 'unocss';
import { type Theme } from '@unocss/preset-mini';
import { alignments, justifies, orders, placements } from '@unocss/preset-mini/dist/rules';

// @ts-expect-error
export const extraGroupRules: Rule<Theme>[] = [
  // (inline-)?(flex|grid)-justify-*
  ...justifies.map(([key, style]) => [`flex-${key}`, style]),
  ...justifies.map(([key, style]) => [`grid-${key}`, style]),
  ...justifies.map(([key, style]) => [`inline-flex-${key}`, style]),
  ...justifies.map(([key, style]) => [`inline-grid-${key}`, style]),

  // (inline-)?(flex|grid)-order-*
  ...orders.map(([key, style]) => [`flex-${key}`, style]),
  ...orders.map(([key, style]) => [`grid-${key}`, style]),
  ...orders.map(([key, style]) => [`inline-flex-${key}`, style]),
  ...orders.map(([key, style]) => [`inline-grid-${key}`, style]),

  // (inline-)?(flex|grid)-content-*
  // (inline-)?(flex|grid)-items-*
  // (inline-)?(flex|grid)-self-*
  ...alignments.map(([key, style]) => [`flex-${key}`, style]),
  ...alignments.map(([key, style]) => [`grid-${key}`, style]),
  ...alignments.map(([key, style]) => [`inline-flex-${key}`, style]),
  ...alignments.map(([key, style]) => [`inline-grid-${key}`, style]),

  // (inline-)?(flex|grid)-place-content-*
  // (inline-)?(flex|grid)-place-items-*
  // (inline-)?(flex|grid)-place-self-*
  ...placements.map(([key, style]) => [`flex-${key}`, style]),
  ...placements.map(([key, style]) => [`grid-${key}`, style]),
  ...placements.map(([key, style]) => [`inline-flex-${key}`, style]),
  ...placements.map(([key, style]) => [`inline-grid-${key}`, style]),
];
