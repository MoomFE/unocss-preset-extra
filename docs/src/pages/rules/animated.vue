<template>
  <div class="text-sm">
    <OuterChain href="https://animate.style/" code>animate.css</OuterChain> 的 Unocss 版本
  </div>
  <n-divider />

  <n-h2>使用</n-h2>
  <DemoCard
    :code="codeStr"
    options-title="动画" options-class="w-55!"
    extra-options-class="w-55!"
  >
    <!-- 动画操控 -->
    <template #title>
      <n-button size="tiny" @click="isAnimating ? setAnimatedStop() : setAnimated()">
        <i-material-symbols-stop v-if="isAnimating" class="text-base" />
        <i-material-symbols-play-arrow v-else class="text-base" />
      </n-button>
    </template>

    <div class="size-full flex justify-center overflow-hidden py-36">
      <div
        class="size-25 flex justify-center items-center rounded animated c-white bg-sky dark:bg-sky-6"
        :class="name && isAnimating && `animated-${name} ${['', 'custom'].includes(durationPreset) ? '' : `animated-${durationPreset}`}`"
        :style="name && isAnimating && {
          ...((repeatInfinite || (repeat && repeat !== 1)) ? { animationIterationCount: repeatInfinite ? 'infinite' : `${repeat}` } : {}),
          ...(delay && delay !== 0 ? { animationDelay: `${delay}${delayUnit}` } : {}),
          ...(durationPreset === 'custom' && duration && duration !== 0 ? { animationDuration: `${duration}${durationUnit}` } : {}),
        }"
        @animationend="setAnimatedStop"
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

    <!-- 动画选项 -->
    <template #extraOptions>
      <n-form label-placement="left" label-width="5.5em" :show-feedback="false">
        <n-form-item label="运行次数">
          <n-space vertical>
            <n-input-number v-if="!repeatInfinite" v-model:value="repeat" :min="1" />
            <n-checkbox v-model:checked="repeatInfinite">无限循环</n-checkbox>
          </n-space>
        </n-form-item>
        <n-divider class="my-3!" />
        <n-form-item label="延迟">
          <n-space vertical>
            <n-input-number v-model:value="delay" :min="0" />
            <n-select v-model:value="delayUnit" :options="timeUnitOptions" />
          </n-space>
        </n-form-item>
        <n-divider class="my-3!" />
        <n-form-item label="周期">
          <n-space vertical>
            <n-radio-group v-model:value="durationPreset" class="mt-1.5" name="duration">
              <n-space vertical>
                <n-radio v-for="({ label, value }) in durationPresetOptions" :key="value" :value="value">{{ label }}</n-radio>
              </n-space>
            </n-radio-group>
            <template v-if="durationPreset === 'custom'">
              <n-input-number v-model:value="duration" :min="0" />
              <n-select v-model:value="durationUnit" :options="timeUnitOptions" />
            </template>
          </n-space>
        </n-form-item>
      </n-form>
    </template>
  </DemoCard>
</template>

<script lang="ts" setup>
  import animatedJson from '../../../../src/rules/animated.json';

  /** 延迟时间单位选项 */
  const timeUnitOptions = [
    { label: '秒', value: 's' },
    { label: '毫秒', value: 'ms' },
  ];
  /** 周期选项 */
  const durationPresetOptions = [
    { label: '很快', value: 'faster' },
    { label: '快', value: 'fast' },
    { label: '默认', value: '' },
    { label: '慢', value: 'slow' },
    { label: '很慢', value: 'slower' },
    { label: '自定义', value: 'custom' },
  ];

  /** 所有的动画名称 */
  const animatedNames = Object.keys(animatedJson);
  /** 当前激活的动画名称 */
  const name = ref();
  /** 运行次数 */
  const repeat = ref(1);
  /** 无限循环 */
  const repeatInfinite = ref(false);
  /** 延迟时间 */
  const delay = ref(0);
  /** 延迟时间单位 */
  const delayUnit = ref(timeUnitOptions[0].value);
  /** 周期预设 */
  const durationPreset = ref('');
  /** 周期 */
  const duration = ref(0);
  /** 周期单位 */
  const durationUnit = ref(timeUnitOptions[0].value);

  /** 是否在执行动画中 */
  const isAnimating = ref(false);

  /** 设置动画 */
  async function setAnimated(value: string = name.value) {
    if (isAnimating.value) {
      name.value = undefined;
      isAnimating.value = false;

      await nextTick();
    }

    name.value = value;
    isAnimating.value = true;
  }
  /** 设置动画结束 */
  function setAnimatedStop() {
    isAnimating.value = false;
  }

  // 动画选项修改后, 重新运行动画
  watch([repeat, repeatInfinite, delay, delayUnit, durationPreset, duration, durationUnit], () => {
    setAnimated();
  });

  /** 代码字符串 */
  const codeStr = computed(() => {
    /** 运行次数 */
    const animatedRepeat = repeatInfinite.value
      ? ' animated-infinite'
      : (repeat.value && repeat.value !== 1)
        ? ` animated-repeat-${repeat.value}`
        : '';
    /** 延迟时间 */
    const animatedDelay = (delay.value && delay.value !== 0) ? ` animated-delay-${delay.value}${delayUnit.value}` : '';
    /** 周期 */
    const animatedDuration = durationPreset.value === 'custom'
      ? (duration.value && duration.value !== 0)
        ? ` animated-duration-${duration.value}${durationUnit.value}`
        : ''
      : durationPreset.value
        ? ` animated-${durationPreset.value}`
        : '';

    return `<div class="animated animated-${name.value}${animatedRepeat}${animatedDelay}${animatedDuration}" />`;
  });

  onMounted(() => {
    setAnimated(animatedNames[0]);
  });
</script>

<route lang="yaml">
name: Rules/Animated
</route>
