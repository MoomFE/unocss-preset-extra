import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', () => {
  /** 深色模式状态 */
  const dark = useDark({
    storageKey: 'upe-color-scheme',
  });
  /** 切换深色模式状态 */
  const toggleDark = useToggle(dark);

  return {
    dark,
    toggleDark,
  };
});
