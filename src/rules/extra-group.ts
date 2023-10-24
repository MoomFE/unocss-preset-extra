import { type Rule } from 'unocss';
import { type Theme } from '@unocss/preset-mini';
import { alignments, justifies, orders, placements } from '@unocss/preset-mini/dist/rules';
import { isPlainObject, isString } from 'mixte';

// @ts-expect-error
export const extraGroupRules: Rule<Theme>[] = [
  // (inline-)?(flex|grid)-justify-*
  ...justifies.map(([key, style]) => {
    return [
      insertBefore(key, '(?:inline-)?(?:flex|grid)-'),
      isPlainObject(style)
        ? () => style
        : style,
      {
        autocomplete: [
          ...justifies.filter(([key]) => isString(key)).map(([key]) => `flex-${key}`),
          ...justifies.filter(([key]) => isString(key)).map(([key]) => `grid-${key}`),
          ...justifies.filter(([key]) => isString(key)).map(([key]) => `inline-flex-${key}`),
          ...justifies.filter(([key]) => isString(key)).map(([key]) => `inline-grid-${key}`),
        ],
      },
    ];
  }),

  // (inline-)?(flex|grid)-order-*
  ...orders.map(([key, style]) => {
    return [
      insertBefore(key, '(?:inline-)?(?:flex|grid)-'),
      isPlainObject(style)
        ? () => style
        : style,
      {
        autocomplete: [
          '(flex|grid)-order-<num>',
          'inline-(flex|grid)-order-<num>',
          ...orders.filter(([key]) => isString(key)).map(([key]) => `flex-${key}`),
          ...orders.filter(([key]) => isString(key)).map(([key]) => `grid-${key}`),
          ...orders.filter(([key]) => isString(key)).map(([key]) => `inline-flex-${key}`),
          ...orders.filter(([key]) => isString(key)).map(([key]) => `inline-grid-${key}`),
        ],
      },
    ];
  }),

  // (inline-)?(flex|grid)-content-*
  // (inline-)?(flex|grid)-items-*
  // (inline-)?(flex|grid)-self-*
  ...alignments.map(([key, style]) => {
    return [
      insertBefore(key, '(?:inline-)?(?:flex|grid)-'),
      isPlainObject(style)
        ? () => style
        : style,
      {
        autocomplete: [
          ...alignments.filter(([key]) => isString(key)).map(([key]) => `flex-${key}`),
          ...alignments.filter(([key]) => isString(key)).map(([key]) => `grid-${key}`),
          ...alignments.filter(([key]) => isString(key)).map(([key]) => `inline-flex-${key}`),
          ...alignments.filter(([key]) => isString(key)).map(([key]) => `inline-grid-${key}`),
        ],
      },
    ];
  }),

  // (inline-)?(flex|grid)-place-content-*
  // (inline-)?(flex|grid)-place-items-*
  // (inline-)?(flex|grid)-place-self-*
  ...placements.map(([key, style]) => {
    return [
      insertBefore(key, '(?:inline-)?(?:flex|grid)-'),
      isPlainObject(style)
        ? () => style
        : style,
      {
        autocomplete: [
          ...placements.filter(([key]) => isString(key)).map(([key]) => `flex-${key}`),
          ...placements.filter(([key]) => isString(key)).map(([key]) => `grid-${key}`),
          ...placements.filter(([key]) => isString(key)).map(([key]) => `inline-flex-${key}`),
          ...placements.filter(([key]) => isString(key)).map(([key]) => `inline-grid-${key}`),
        ],
      },
    ];
  }),
];

/**
 * 将指定内容插入到正则或字符串的开头, 返回新的正则表达式
 */
function insertBefore(str: string | RegExp, insert: string) {
  if (typeof str === 'string')
    return new RegExp(`^${insert}${str}$`);

  return new RegExp(`^${insert}${
    str.source.slice(
      str.source.startsWith('^') ? 1 : 0,
      str.source.endsWith('$') ? -1 : undefined,
    )
  }$`);
}
