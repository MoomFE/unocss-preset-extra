<template>
  <div class="basic-card w-full flex flex-col b b-solid rounded">
    <!-- 头部区域 -->
    <div
      v-if="slots.header"
      class="basic-card-header flex-none rounded" un:not-last="b-b b-b-solid rounded-b-none"
      :class="props.headerClass"
    >
      <slot name="header" />
    </div>

    <!-- 内容区域 -->
    <div
      v-if="slots.default"
      class="basic-card-content rounded" un:not-last="b-b b-b-solid rounded-b-none"
      :class="[{ scrollbar: props.scrollable }, props.contentClass]"
    >
      <slot />
    </div>

    <!-- 底部区域 -->
    <div
      v-if="slots.footer"
      class="basic-card-footer rounded"
      :class="props.footerClass"
    >
      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  interface Props {
    /** 头部区域额外样式类 */
    headerClass?: string
    /** 内容区域额外样式类 */
    contentClass?: string
    /** 底部区域额外样式类 */
    footerClass?: string
    /** 可滚动 ( 必须设定卡片高度 ) */
    scrollable?: boolean
  }

  const props = defineProps<Props>();
  const slots = useSlots();
</script>

<style lang="scss">
  // 背景色
  .basic-card,
  .basic-card-header, .basic-card-content, .basic-card-footer{
    background-color: var(--card-color);
  }
  // 边框色
  .basic-card,
  .basic-card-header, .basic-card-content{
    border-color: var(--border-color);
  }
</style>
