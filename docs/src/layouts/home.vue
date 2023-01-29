<template>
  <div class="min-h-screen flex">
    <div class="w-full" un:flex="~ grow col gap-3">
      <!-- 导航栏 -->
      <div class="h-13 flex-none sticky top-0 z-10 card-bg-dynamic" un:el="4 op-36">
        <n-space
          class="w-320 max-w-full h-full mxa px-3"
          item-style="line-height: 1"
          align="center" justify="space-between" :wrap="false"
        >
          <!-- 菜单栏左侧 -->
          <n-space class="[&>div]-(flex items-center)">
            <!-- 名称 -->
            <div class="text-lg font-bold">{{ settings.title }}</div>
            <!-- 菜单栏左侧内容 ( 由页面传递出来的 ) -->
            <component v-if="renderNavbarLeft" :is="renderNavbarLeft" />
          </n-space>

          <!-- 菜单栏右侧 -->
          <n-space class="[&>div]-(flex items-center)">
            <!-- Github -->
            <n-button :href="homepage" target="_blank" tag="a" text>
              <i-mdi-github class="text-lg" />
            </n-button>
            <!-- 深色模式切换 -->
            <n-button text @click="theme.toggleDark()">
              <div class="text-lg transition-colors duration-colors" :class="theme.dark ? 'text-[#FFEB3B]' : 'text-[#FF7043]'">
                <transition un:animated="~ faster" enter-active-class="animated-rotate-in" leave-active-class="animated-rotate-out" mode="out-in">
                  <i-mdi-moon-waxing-crescent v-if="theme.dark" />
                  <i-mdi-white-balance-sunny v-else />
                </transition>
              </div>
            </n-button>
          </n-space>
        </n-space>
      </div>

      <!-- 内容区域 -->
      <div class="w-320 max-w-full h-full mxa px-3" un:flex="~ grow" :class="route.meta.layoutContentClass">
        <slot v-if="slots.default" />
        <router-view v-else @setRenderNavbarLeft="(fn?: () => VNode) => renderNavbarLeft = fn" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import type { VNode } from 'vue';
  import { homepage } from '@@/package.json';
  import { settings } from '@/settings';

  const route = useRoute();
  const slots = useSlots();

  const theme = useThemeStore();

  /** 渲染菜单栏左侧内容的方法 */
  const renderNavbarLeft = ref<() => VNode>();
</script>
