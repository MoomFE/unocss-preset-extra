<template>
  <!-- 侧边栏 -->
  <BasicSidebar ref="sidebarRef" @setDrawerOpenBtn="(fn) => emit('setRenderNavbarLeft', fn)">
    <div class="w-60" un:flex="none">
      <div class="w-60 h-[calc(100%-64px)] fixed scrollbar" un:b-r="1 solid gray op-36">
        <n-menu v-model:value="value" :options="options" />
      </div>
    </div>
    <template #drawer>
      <n-menu v-model:value="value" :options="options" @update:value="sidebarRef.closeDrawer()" />
    </template>
  </BasicSidebar>

  <!-- 内容区域 -->
  <div class="px-6" un:p="x-6 t-5 b-10" un:flex="grow">
    <div class="text-3xl font-bold capitalize mb-1">{{ value }}</div>
    <router-view v-slot="{ Component, route }">
      <transition un:animated="~ faster" enter-active-class="animated-fade-in" leave-active-class="animated-fade-out" mode="out-in">
        <component :is="h('div', Component)" :key="route.path" />
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts" setup>
  import type { MenuProps } from 'naive-ui';
  import { camelCase, upperFirst } from 'lodash';

  const emit = defineEmits(['setRenderNavbarLeft']);

  const route = useRoute();
  const router = useRouter();

  const sidebarRef = ref();

  /** 规则列表 */
  const rules = ['size', 'elevation', 'animated'];
  /** 菜单 */
  const options: MenuProps['options'] = rules.map(key => ({ label: key, key }));
  /** 当前选中的菜单项 */
  const value = ref(
    route.path.split('/').reverse()[0],
  );

  whenever(value, (key) => {
    router.push({
      name: `Rules/${upperFirst(camelCase(key))}`,
    });
  });
</script>

<route lang="yaml">
name: Rules
redirect:
  name: Rules/Size
meta:
  layout: home
  layoutContentClass: px-0!
</route>
