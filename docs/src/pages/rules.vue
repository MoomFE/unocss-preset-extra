<template>
  <!-- 侧边栏 -->
  <div class="w-60" un:b-r="1 solid gray op-36" un:flex="none">
    <client-only>
      <n-menu v-model:value="value" :options="options" />
    </client-only>
  </div>
  <!-- 内容区域 -->
  <div un:flex="grow">
    <router-view />
  </div>
</template>

<script lang="ts" setup>
  import type { MenuProps } from 'naive-ui';
  import { camelCase, upperFirst } from 'lodash';

  const route = useRoute();
  const router = useRouter();

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
  layoutContentClass: gap-2 pl-0
</route>
