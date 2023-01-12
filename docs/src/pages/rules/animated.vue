<template>
  <div class="text-sm">
    <OuterChain href="https://animate.style/" code>animate.css</OuterChain> 的 Unocss 版本
  </div>
  <n-divider />

  <n-h2>使用</n-h2>
  <DemoCard
    :code="codeStr"
    options-title="动画" options-class="w-55!"
  >
    <div class="size-full flex justify-center overflow-hidden py-36">
      <div
        class="size-25 flex justify-center items-center rounded animated c-white bg-sky dark:bg-sky-6"
        :class="name && isAnimating ? `animated-${name}` : ''"
        @animationend="onAnimationEnd"
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
            @click="setAnimated(animatedName)"
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

  /** 当前激活的动画名称 */
  const name = ref();
  /** 所有的动画名称 */
  const animatedNames = Object.keys(animatedJson);

  /** 是否在执行动画中 */
  const isAnimating = ref(false);

  /** 设置动画 */
  function setAnimated(value: string) {
    name.value = value;
    isAnimating.value = true;
  }
  /** 动画结束时的回调 */
  function onAnimationEnd() {
    isAnimating.value = false;
  }

  /** 代码字符串 */
  const codeStr = computed(() => {
    return `<div class="animated animated-${name.value}" />`;
  });

  onMounted(() => {
    setAnimated(animatedNames[0]);
  });
</script>

<route lang="yaml">
name: Rules/Animated
</route>
