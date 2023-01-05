<template>
  <div class="flex">
    <!-- 内容区域 -->
    <n-card
      class="not-last:rounded-r-0!"
      :segmented="{ content: true, footer: true }" header-style="padding: 0"
    >
      <!-- 头部内容 -->
      <template v-if="props.code" #header>
        <div class="h-8 flex items-center text-base lh-none px-3">
          <div class="flex-grow" />

          <!-- 显隐代码切换 -->
          <n-button v-if="props.code" text @click="toggleShowCode()">
            <i-material-symbols-code class="text-xl" />
          </n-button>
        </div>
      </template>

      <!-- 预览 -->
      <div v-if="slots.default" class="flex justify-center">
        <slot />
      </div>

      <!-- 代码 -->
      <template v-if="props.code && showCode" #footer>
        <n-config-provider :hljs="hljs">
          <n-code :code="props.code" language="html" />
        </n-config-provider>
      </template>
    </n-card>

    <!-- 选项区域 -->
    <n-card
      v-if="slots.options"
      un:important="w-60 rounded-l-0 b-l-none"
      :segmented="{ content: true, footer: true }"
      header-style="padding: 0" content-style="padding: 0"
    >
      <!-- 头部内容 -->
      <template #header>
        <div class="h-8 flex items-center text-base lh-none px-3">选项</div>
      </template>

      <!-- 选项内容 -->
      <div class="px-3 py-1.5">
        <slot name="options" :show-code="showCode" />
      </div>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
  import hljs from 'highlight.js/lib/core';
  import html from 'highlight.js/lib/languages/xml';

  interface Props {
    /** 代码 */
    code?: string
  }

  const props = defineProps<Props>();
  const slots = useSlots();

  hljs.registerLanguage('html', html);

  /** 是否显示代码 */
  const showCode = ref(false);
  const toggleShowCode = useToggle(showCode);
</script>
