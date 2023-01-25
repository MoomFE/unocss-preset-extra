<template>
  <div class="flex">
    <!-- 内容区域 -->
    <BasicCard class="not-last:rounded-r-0!" footer-class="py-3 px-6">
      <!-- 头部内容 -->
      <template v-if="props.code" #header>
        <div class="h-8 flex items-center text-base lh-none px-3">
          <div class="flex-grow" />

          <!-- 显隐代码切换 -->
          <n-tooltip v-if="props.code">
            <template #trigger>
              <n-button class="disabled-button-hover" :type="showCode ? 'primary' : 'default'" :focusable="false" text @click="toggleShowCode()">
                <i-material-symbols-code class="text-xl" />
              </n-button>
            </template>
            {{ showCode ? '收起代码' : '显示代码' }}
          </n-tooltip>
        </div>
      </template>

      <!-- 预览 -->
      <div v-if="slots.default" class="flex justify-center">
        <slot />
      </div>

      <!-- 代码 -->
      <template v-if="props.code && showCode" #footer>
        <n-config-provider :hljs="hljs">
          <n-code :code="props.code" language="html" word-wrap />
        </n-config-provider>
      </template>
    </BasicCard>

    <!-- 选项区域 -->
    <RenderOptions name="options" />
    <RenderOptions name="extraOptions" />
  </div>
</template>

<script lang="tsx" setup>
  import hljs from 'highlight.js/lib/core';
  import html from 'highlight.js/lib/languages/xml';
  import BasicCard from '@/components/BasicCard.vue';

  interface Props {
    /** 代码 */
    code?: string
    /** 选项区额外样式类 */
    optionsClass?: string
    /** 选项区标题 */
    optionsTitle?: string
    /** 额外选项区额外样式类 */
    extraOptionsClass?: string
    /** 额外选项区标题 */
    extraOptionsTitle?: string
  }

  const props = defineProps<Props>();
  const slots = useSlots();

  hljs.registerLanguage('html', html);

  /** 是否显示代码 */
  const showCode = ref(true);
  const toggleShowCode = useToggle(showCode);

  /** 渲染选项区域 */
  function RenderOptions({ name }: { name: string }) {
    if (!slots[name]) return;

    return (
      <div class={['w-60 flex-none relative [&:not(:last-child)>div]-rounded-r-0 [&:not(:last-child)>div>div]-rounded-r-0', props[`${name}Class` as keyof Props]]}>
        <BasicCard class="size-full absolute top-0 left-0 rounded-l-0 b-l-none" scrollable>
          {{
            header: () => (
              <div class="h-8 flex items-center text-base lh-none px-3">
                { props[`${name}Title` as keyof Props] ?? '选项' }
              </div>
            ),
            default: () => (
              <div class="px-3 py-1.5">
                {{
                  default: () => slots[name]?.({ showCode: showCode.value }),
                }}
              </div>
            ),
          }}
        </BasicCard>
      </div>
    );
  }
</script>

<style lang="scss" scoped>
  .disabled-button-hover:hover{
    color: var(--n-text-color);
    background-color: var(--n-color);
  }
</style>
