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
    <CodeHighLight
      code="
        <!-- 使用之前 -->
        <div class=&quot;flex-(~ col none) justify-center&quot; />
        <div class=&quot;justify-center&quot; un:flex=&quot;~ col none&quot; />
        <!-- 使用之后 -->
        <div class=&quot;flex-(~ col none justify-center)&quot; />
        <div un:flex=&quot;~ col none justify-center&quot; />
      "
    />
  </n-card>

  <n-h2>规则</n-h2>
  <n-card>
    <CodeHighLight
      code="
        <!-- (inline-)?(flex|grid)-justify-* -->
        <div class=&quot;flex-(~ justify-start)&quot; />
        <div class=&quot;grid-(~ justify-center)&quot; />
        <div class=&quot;inline-flex-(~ justify-between)&quot; />
        <div class=&quot;inline-grid-(~ justify-end)&quot; />

        <!-- (inline-)?(flex|grid)-order-* -->
        <div class=&quot;flex-(~ order-first)&quot; />
        <div class=&quot;grid-(~ order-1)&quot; />
        <div class=&quot;inline-flex-(~ order-2)&quot; />
        <div class=&quot;inline-grid-(~ order-last)&quot; />

        <!-- (inline-)?(flex|grid)-content-* -->
        <div class=&quot;flex-(~ content-start)&quot; />
        <div class=&quot;grid-(~ content-center)&quot; />
        <div class=&quot;inline-flex-(~ content-between)&quot; />
        <div class=&quot;inline-grid-(~ content-end)&quot; />

        <!-- (inline-)?(flex|grid)-items-* -->
        <div class=&quot;flex-(~ items-start)&quot; />
        <div class=&quot;grid-(~ items-center)&quot; />
        <div class=&quot;inline-flex-(~ items-baseline)&quot; />
        <div class=&quot;inline-grid-(~ items-end)&quot; />

        <!-- (inline-)?(flex|grid)-self-* -->
        <div class=&quot;flex-(~ self-start)&quot; />
        <div class=&quot;grid-(~ self-center)&quot; />
        <div class=&quot;inline-flex-(~ self-baseline)&quot; />
        <div class=&quot;inline-grid-(~ self-end)&quot; />

        <!-- (inline-)?(flex|grid)-place-content-* -->
        <div class=&quot;flex-(~ place-content-start)&quot; />
        <div class=&quot;grid-(~ place-content-center)&quot; />
        <div class=&quot;inline-flex-(~ place-content-between)&quot; />
        <div class=&quot;inline-grid-(~ place-content-end)&quot; />

        <!-- (inline-)?(flex|grid)-place-items-* -->
        <div class=&quot;flex-(~ place-items-start)&quot; />
        <div class=&quot;grid-(~ place-items-center)&quot; />
        <div class=&quot;inline-flex-(~ place-items-stretch)&quot; />
        <div class=&quot;inline-grid-(~ place-items-end)&quot; />

        <!-- (inline-)?(flex|grid)-place-self-* -->
        <div class=&quot;flex-(~ place-self-start)&quot; />
        <div class=&quot;grid-(~ place-self-center)&quot; />
        <div class=&quot;inline-flex-(~ place-self-stretch)&quot; />
        <div class=&quot;inline-grid-(~ place-self-end)&quot; />
      "
    />
  </n-card>
</template>

<script lang="ts" setup>

</script>

<route lang="yaml">
name: Rules/ExtraGroup
</route>
