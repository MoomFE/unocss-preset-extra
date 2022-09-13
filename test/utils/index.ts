import { omit } from 'lodash-es';

export function removeUnusedCSS(cssJson: object) {
  return omit(cssJson, ['*,::before,::after', '::backdrop']);
}

export function removeLastZero(v: string | number) {
  return `${v}`.replace(/0+$/, '');
}
