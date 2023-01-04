<template>
  <div class="px-4 py-10 text-center">
    <div class="text-5xl">
      <i-bx-message-alt-x class="inline-block" />
    </div>

    <div class="mt-1">
      {{ t('not-found') }}
    </div>

    <div class="mt-6">
      <NButton type="primary" @click="router.back()">
        {{ t('button.back') }}
      </NButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const router = useRouter();
  const { t } = useI18n();
</script>
