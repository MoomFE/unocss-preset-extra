<template>
  <div class="text-sm">
    <OuterChain href="https://animate.style/" code>animate.css</OuterChain> 的 Unocss 版本
  </div>
  <n-divider />

  <n-h2>使用</n-h2>
  <DemoCard
    options-title="动画"
  >
    <div class="size-full flex justify-center overflow-hidden py-36">
      <div
        class="size-25 flex justify-center items-center rounded animated c-white bg-sky dark:bg-sky-6"
        :class="name ? `animated-${name}` : ''"
      >
        Animated
      </div>
    </div>

    <!-- 动画选择 -->
    <template #options>
      <n-space vertical>
        <template v-for="animatedName in animatedNames" :key="animatedName">
          <n-button
            class="justify-start!"
            v-bind="animatedName === name ? { type: 'primary', secondary: true } : { quaternary: true }" block
            @click="name = animatedName"
          >
            {{ animatedName }}
          </n-button>
        </template>
      </n-space>
    </template>
  </DemoCard>
</template>

<script lang="ts" setup>
  import animatedJson from '../../../../src/rules/animated.json';

  const name = ref('bounce');
  const animatedNames = Object.keys(animatedJson);
</script>

<route lang="yaml">
name: Rules/Animated
</route>
