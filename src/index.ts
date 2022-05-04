import { type Preset } from 'unocss';
import { sizeRules } from '@/rules/size';

export function presetExtra(): Preset {
  return {
    name: 'unocss-preset-extra',
    rules: [
      // 同时定义宽高
      ...sizeRules,
    ],
  };
}
