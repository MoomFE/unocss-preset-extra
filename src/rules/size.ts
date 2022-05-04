import { type Rule } from 'unocss';
import { handler } from '@unocss/preset-mini/utils';

type WidthProps = 'width' | 'maxWidth' | 'minWidth';
type HeightProps = 'height' | 'maxHeight' | 'minHeight';

function camelCase(str: string) {
  return str.replace(/-([a-z])/g, (_, v) => v.toUpperCase());
}

/**
 * 同时定义宽高
 */
export const sizeRules: Rule[] = [[
  /^(min-|max-)?size-(.+)$/,
  ([, minmax, prop], { theme }) => {
    const widthProperty = `${minmax || ''}width`;
    const heightProperty = `${minmax || ''}height`;

    // @ts-expect-error ???
    const width = theme[camelCase(widthProperty) as WidthProps]?.[prop];
    // @ts-expect-error ???
    const height = theme[camelCase(heightProperty) as HeightProps]?.[prop];

    if (width != null && height != null) {
      return {
        [widthProperty]: width,
        [heightProperty]: height,
      };
    }

    const value = handler.bracket.cssvar.auto.fraction.rem(prop);

    return {
      [widthProperty]: value,
      [heightProperty]: value,
    };
  },
  {
    autocomplete: [
      'size-$width|height|maxWidth|maxHeight|minWidth|minHeight',
      '(max|min)-size-$width|height|maxWidth|maxHeight|minWidth|minHeight',
    ],
  },
]];
