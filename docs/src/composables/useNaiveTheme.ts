import type { GlobalThemeOverrides } from 'naive-ui';
import { darkTheme, dateZhCN, zhCN } from 'naive-ui';
import { deepMerge } from '@moomfe/small-utils';
import { colors, fontFamily } from '@/shared/unocss.theme';

/** 通用主题变量覆盖 */
const commonOverrides: GlobalThemeOverrides = {
  common: {
    // 默认字体
    fontFamily: fontFamily.sans,
    // 等宽字体
    fontFamilyMono: fontFamily.mono,

    // Primary 颜色
    primaryColor: colors.primary,
    primaryColorHover: colors['primary-hover'],
    primaryColorPressed: colors['primary-active'],
    primaryColorSuppl: colors.primary,
    // Info 颜色
    infoColor: colors.info,
    infoColorHover: colors['info-hover'],
    infoColorPressed: colors['info-active'],
    infoColorSuppl: colors.info,
    // Success 颜色
    successColor: colors.success,
    successColorHover: colors['success-hover'],
    successColorPressed: colors['success-active'],
    successColorSuppl: colors.success,
    // Warning 颜色
    warningColor: colors.warning,
    warningColorHover: colors['warning-hover'],
    warningColorPressed: colors['warning-active'],
    warningColorSuppl: colors.warning,
    // Error 颜色
    errorColor: colors.error,
    errorColorHover: colors['error-hover'],
    errorColorPressed: colors['error-active'],
    errorColorSuppl: colors.error,
  },
};

/** 亮色主题变量覆盖 */
const lightThemeOverrides: GlobalThemeOverrides = deepMerge({}, commonOverrides, {

});
/** 深色主题变量覆盖 */
const darkThemeOverrides: GlobalThemeOverrides = deepMerge({}, commonOverrides, {
  Button: {
    textColorPrimary: '#FFF',
    textColorHoverPrimary: '#FFF',
    textColorPressedPrimary: '#FFF',
    textColorFocusPrimary: '#FFF',
    textColorDisabledPrimary: '#FFF',
  },
});

export const useNaiveTheme = createSharedComposable(() => {
  const themeStore = useThemeStore();

  /** 当前 Naive UI 主题 */
  const theme = computed(() => themeStore.dark ? darkTheme : null);
  /** 对当前 NaiveUI 主题的变量覆盖 */
  const themeOverrides = computed(() => themeStore.dark ? darkThemeOverrides : lightThemeOverrides);

  return {
    theme,
    themeOverrides,
    zhCN,
    dateZhCN,
  };
});
