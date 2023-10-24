<template>
  <!-- 桌面模式 -->
  <slot v-if="isDesktop" />
  <!-- 抽屉模式 -->
  <renderDrawer v-else />
</template>

<script lang="tsx" setup>
  import { NButton, NDrawer } from 'naive-ui';
  import { isBrowser } from 'mixte';
  import { breakpoints } from '@/shared/unocss.theme';

  const emit = defineEmits(['setDrawerOpenBtn']);
  const slots = useSlots();

  /** 是否开启抽屉 */
  const open = ref(false);
  /** 桌面模式 */
  const isDesktop = isBrowser
    ? useBreakpoints({ desktop: Number.parseInt(breakpoints.lg) }).desktop
    : ref(true);

  /** 渲染抽屉 */
  function renderDrawer() {
    return (
      <NDrawer
        show={ open.value } onUpdateShow={v => open.value = v}
        placement="left"
      >
        { slots.drawer?.() }
      </NDrawer>
    );
  }

  /** 渲染打开抽屉的按钮 */
  function renderDrawerOpenBtn() {
    return (
      <NButton text onClick={() => open.value = true}>
        <i-ic-round-menu class="text-xl" />
      </NButton>
    );
  }

  // 通知渲染打开抽屉的按钮
  watch(isDesktop, isDesktop => emit('setDrawerOpenBtn', isDesktop ? undefined : renderDrawerOpenBtn), {
    immediate: true,
  });
  // 注销渲染打开抽屉的按钮
  onUnmounted(() => {
    emit('setDrawerOpenBtn', undefined);
  });

  defineExpose({
    closeDrawer: () => open.value = false,
  });
</script>
