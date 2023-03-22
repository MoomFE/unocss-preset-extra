import { omit } from 'lodash-es';

export function removeLastZero(v: string | number) {
  return `${v}`.replace(/0+$/, '');
}
