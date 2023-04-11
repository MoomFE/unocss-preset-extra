<template>
  <n-config-provider :hljs="hljs">
    <n-code :code="code" language="html" word-wrap />
  </n-config-provider>
</template>

<script lang="ts" setup>
  import hljs from 'highlight.js/lib/core';
  import html from 'highlight.js/lib/languages/xml';

  interface Props {
    /** 代码 */
    code: string
    /** 去除代码每行左侧空格 */
    lineTrimStart?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    lineTrimStart: true,
  });

  hljs.registerLanguage('html', html);

  const code = computed(() => {
    if (props.lineTrimStart)
      return props.code.replace(/^ +/mg, '');

    return props.code;
  });
</script>
