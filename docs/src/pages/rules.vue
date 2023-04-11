<template>
  <!-- 侧边栏 -->
  <BasicSidebar ref="sidebarRef" @setDrawerOpenBtn="(fn) => emit('setRenderNavbarLeft', fn)">
    <div class="w-60" un:flex="none">
      <div class="w-60 h-[calc(100%-64px)] fixed scrollbar" un:b-r="1 solid gray op-36">
        <n-menu v-model:value="value" :options="options" :render-label="renderMenuLabel" />
      </div>
    </div>
    <template #drawer>
      <n-menu v-model:value="value" :options="options" :render-label="renderMenuLabel" @update:value="sidebarRef.closeDrawer()" />
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

<script lang="tsx" setup>
  import type { MenuOption, MenuProps } from 'naive-ui';
  import { RouterLink } from 'vue-router';
  import { camelCase, upperFirst } from 'lodash';

  const emit = defineEmits(['setRenderNavbarLeft']);

  const route = useRoute();

  const sidebarRef = ref();

  /** 规则列表 */
  const rules = ['size', 'elevation', 'animated', 'extra-group'];
  /** 菜单 */
  const options: MenuProps['options'] = rules.map(key => ({ label: key, key }));
  /** 当前选中的菜单项 */
  const value = ref();

  /** 更新当前选中的菜单项 */
  function updateValue() {
    value.value = route.path.split('/').reverse()[0];
  }

  /** 渲染菜单标签 */
  function renderMenuLabel(option: MenuOption) {
    return (
      <RouterLink to={{ name: `Rules/${upperFirst(camelCase(option.key as string))}` }}>
        { option.label }
      </RouterLink>
    );
  }

  updateValue();

  watch(() => route.path, updateValue);
</script>

<route lang="yaml">
name: Rules
redirect:
  name: Rules/Size
meta:
  layout: home
  layoutContentClass: px-0!
</route>
