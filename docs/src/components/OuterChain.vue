<template>
  <a :href="href" target="_blank" rel="noopener">
    <n-text :code="code">
      <slot />
      <i-octicon-link-external-16 class="inline ml-1" />
    </n-text>
  </a>
</template>

<script lang="tsx" setup>
  defineProps<{ href: string; code?: boolean }>();
</script>
