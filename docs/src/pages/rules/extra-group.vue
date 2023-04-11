<template>
  <div class="text-sm">
    额外的可在分组中使用的规则, 可在
    <OuterChain href="https://github.com/unocss/unocss/tree/main/packages/transformer-variant-group" code>Variant Group</OuterChain>
    或
    <OuterChain href="https://github.com/unocss/unocss/tree/main/packages/preset-attributify" code>Attributify Mode</OuterChain>
    下使用
  </div>
  <n-divider />

  <n-h2>示例</n-h2>
  <n-card embedded>
    <CodeHighLight :code='`
      <!-- 使用之前 -->
      <div class="flex-(~ col none) justify-center" />
      <div class="justify-center" un:flex="~ col none" />
      <!-- 使用之后 -->
      <div class="flex-(~ col none justify-center)" />
      <div un:flex="~ col none justify-center" />
    `' />
  </n-card>

  <n-h2>规则</n-h2>
  <n-card>
    <CodeHighLight :code='`
      <!-- (inline-)?(flex|grid)-justify-* -->
      <div class="flex-(~ justify-start)" />
      <div class="grid-(~ justify-center)" />
      <div class="inline-flex-(~ justify-between)" />
      <div class="inline-grid-(~ justify-end)" />

      <!-- (inline-)?(flex|grid)-order-* -->
      <div class="flex-(~ order-first)" />
      <div class="grid-(~ order-1)" />
      <div class="inline-flex-(~ order-2)" />
      <div class="inline-grid-(~ order-last)" />

      <!-- (inline-)?(flex|grid)-content-* -->
      <div class="flex-(~ content-start)" />
      <div class="grid-(~ content-center)" />
      <div class="inline-flex-(~ content-between)" />
      <div class="inline-grid-(~ content-end)" />

      <!-- (inline-)?(flex|grid)-items-* -->
      <div class="flex-(~ items-start)" />
      <div class="grid-(~ items-center)" />
      <div class="inline-flex-(~ items-baseline)" />
      <div class="inline-grid-(~ items-end)" />

      <!-- (inline-)?(flex|grid)-self-* -->
      <div class="flex-(~ self-start)" />
      <div class="grid-(~ self-center)" />
      <div class="inline-flex-(~ self-baseline)" />
      <div class="inline-grid-(~ self-end)" />

      <!-- (inline-)?(flex|grid)-place-content-* -->
      <div class="flex-(~ place-content-start)" />
      <div class="grid-(~ place-content-center)" />
      <div class="inline-flex-(~ place-content-between)" />
      <div class="inline-grid-(~ place-content-end)" />

      <!-- (inline-)?(flex|grid)-place-items-* -->
      <div class="flex-(~ place-items-start)" />
      <div class="grid-(~ place-items-center)" />
      <div class="inline-flex-(~ place-items-stretch)" />
      <div class="inline-grid-(~ place-items-end)" />

      <!-- (inline-)?(flex|grid)-place-self-* -->
      <div class="flex-(~ place-self-start)" />
      <div class="grid-(~ place-self-center)" />
      <div class="inline-flex-(~ place-self-stretch)" />
      <div class="inline-grid-(~ place-self-end)" />
    `' />
  </n-card>
</template>

<script lang="ts" setup>

</script>

<route lang="yaml">
name: Rules/ExtraGroup
</route>