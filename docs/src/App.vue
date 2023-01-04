<template>
  <!-- 全局化配置 ( 主题 ) -->
  <NConfigProvider :theme="theme" :theme-overrides="themeOverrides" :locale="zhCN" :date-locale="dateZhCN" abstract>
    <!-- 加载条 ( 页面加载进度 ) -->
    <NLoadingBarProvider>
      <router-view />
      <GetAppEnv />
    </NLoadingBarProvider>
    <!-- 全局样式 ( 写入一些样式至 body 层 ) -->
    <NGlobalStyle />
  </NConfigProvider>
</template>

<script lang="ts" setup>
  import { useLoadingBar } from 'naive-ui';
  import { app } from '@/shared/env';
  import { settings } from '@/settings';

  /** 主题相关 */
  const { theme, themeOverrides, zhCN, dateZhCN } = useNaiveTheme();

  /** 获取当前应用的一些环境变量 */
  const GetAppEnv = () => {
    app.loadingBar = useLoadingBar();
  };

  useHead({
    title: settings.title,
  });
</script>
