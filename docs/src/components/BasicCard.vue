<template>
  <div class="basic-card w-full flex flex-col b b-solid rounded">
    <!-- 头部区域 -->
    <div
      v-if="slots.header"
      class="basic-card-header flex-none b-b b-b-solid rounded-t"
      :class="props.headerClass"
    >
      <slot name="header" />
    </div>

    <!-- 内容区域 -->
    <div
      v-if="slots.default"
      class="basic-card-content flex-grow rounded-b"
      :class="[{ scrollbar: props.scrollable }, props.contentClass]"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
  interface Props {
    /** 头部区域额外样式类 */
    headerClass?: string
    /** 内容区域额外样式类 */
    contentClass?: string
    /** 可滚动 ( 必须设定卡片高度 ) */
    scrollable?: boolean
  }

  const props = defineProps<Props>();
  const slots = useSlots();
</script>

<style lang="scss">
  // 背景色
  .basic-card, .basic-card-header, .basic-card-content{
    background-color: var(--card-color);
  }
  // 边框色
  .basic-card, .basic-card-header{
    border-color: var(--border-color);
  }
</style>
