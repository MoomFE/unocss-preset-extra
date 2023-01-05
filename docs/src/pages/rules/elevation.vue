<template>
  <div class="text-sm">
    <OuterChain href="https://vuetifyjs.com/zh-Hans/styles/elevation/" code>Vuetify 海拔</OuterChain> 样式
  </div>
  <n-divider />

  <n-h2>使用</n-h2>
  <DemoCard :code="codeStr">
    <div class="py-12">
      <ElevationDiv :index="index" :opacity="opacity" />
    </div>
    <template #options="{ showCode }">
      <n-form label-placement="left" label-width="4em" :show-feedback="false">
        <client-only>
          <n-form-item label="层级">
            <n-slider v-model:value="index" :max="24" />
          </n-form-item>
          <n-form-item label="透明度">
            <n-slider v-model:value="opacity" :max="100" />
          </n-form-item>
          <n-form-item v-if="showCode" label="简写">
            <n-checkbox v-model:checked="abbr" />
          </n-form-item>
        </client-only>
      </n-form>
    </template>
  </DemoCard>

  <n-h2>所有层级</n-h2>
  <n-card>
    <div un:flex="~ wrap gap-7.5">
      <ElevationDiv v-for="i in 25" :key="i" :index="i - 1" />
    </div>
  </n-card>
</template>

<script lang="tsx" setup>
  /** 层级 */
  const index = ref(6);
  /** 透明度 */
  const opacity = ref(100);
  /** 简写 */
  const abbr = ref(false);

  /** 代码字符串 */
  const codeStr = computed(() => {
    const el = abbr.value ? 'el' : 'elevation';
    const op = abbr.value ? 'op' : 'opacity';
    const opValue = opacity.value;

    return `<div class="${el}-${index.value}${opValue === 100 ? '' : ` ${el}-${op}-${opacity.value}`}" />`;
  });

  /** 海拔 */
  const ElevationDiv = ({ index, opacity }: { index: string | number; opacity?: number }) => (
    <div class={`size-25 flex justify-center items-center rounded c-white bg-sky el-${index} el-op-${opacity ?? 100}`}>{ index }</div>
  );
</script>

<route lang="yaml">
name: Rules/Elevation
</route>
