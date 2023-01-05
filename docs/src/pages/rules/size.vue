<template>
  <div class="text-sm">同时设置 <n-text code>width</n-text> 和 <n-text code>height</n-text> 样式</div>
  <n-divider />

  <n-h2>宽高</n-h2>
  <n-data-table
    :columns="columns"
    :data="sizeData"
    size="small" max-height="360px"
  />

  <n-h2>最小宽高</n-h2>
  <n-data-table
    :columns="columns"
    :data="minSizeData"
    size="small" max-height="360px"
  />

  <n-h2>最大宽高</n-h2>
  <n-data-table
    :columns="columns"
    :data="maxSizeData"
    size="small" max-height="360px"
  />
</template>

<script lang="tsx" setup>
  import type { DataTableProps } from 'naive-ui';
  import { width } from '@/shared/unocss.theme';

  const size = {
    '0': '0rem',
    '0.5': '0.125rem',
    '1': '0.25rem',
    '1.5': '0.375rem',
    '2': '0.5rem',
    '1/2': '50%',
    '1/4': '25%',
    ...width,
    'full': '100%',
  };

  /** 表头 */
  const columns: DataTableProps['columns'] = [
    {
      title: 'Class',
      key: 'c',
      render: ({ c }) => {
        return <div class="text-xs font-mono c-violet-600">{ c }</div>;
      },
    },
    {
      title: 'Properties',
      key: 'p',
      render: ({ p }) => {
        return <div class="text-xs font-mono c-sky-600">{ p }</div>;
      },
    },
  ];

  /** 宽高数据 */
  const sizeData = Object.entries(size).map(([c, p]) => {
    return {
      c: `size-${c}`,
      p: `width: ${p}; height: ${p};`,
    };
  });
  /** 最小宽高数据 */
  const minSizeData = Object.entries(size).map(([c, p]) => {
    return {
      c: `min-size-${c}`,
      p: `min-width: ${p}; min-height: ${p};`,
    };
  });
  /** 最大宽高数据 */
  const maxSizeData = Object.entries(size).map(([c, p]) => {
    return {
      c: `max-size-${c}`,
      p: `max-width: ${p}; max-height: ${p};`,
    };
  });
</script>

<route lang="yaml">
name: Rules/Size
</route>
