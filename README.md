# [unocss-preset-extra](https://unocss-preset-extra.moomfe.com/)

[UnoCSS](https://github.com/unocss/unocss) 扩展, 提供类名简写及额外一些样式预设

[![npm](https://img.shields.io/npm/v/unocss-preset-extra.svg)](https://www.npmjs.com/package/unocss-preset-extra)
[![Downloads](https://img.shields.io/npm/dm/unocss-preset-extra.svg)](https://www.npmjs.com/package/unocss-preset-extra)

<br>

## 文档

[https://unocss-preset-extra.moomfe.com/](https://unocss-preset-extra.moomfe.com/)

<br>

## 内置规则

<details>
  <summary>size - 同时设置 `width` 和 `height` 样式</summary>
  <br>

  ```html
  <div class="size-auto" />
  <div class="size-full" />
  <div class="min-size-1/2" />
  <div class="min-size-xs" />
  <div class="max-size-1" />
  <div class="max-size-[1px]" />
  ```

  这将生成以下 css 代码

  ```css
  .size-auto { width: auto; height: auto }
  .size-full { width: 100%; height: 100% }
  .min-size-1\/2 { min-width: 50%; min-height: 50% }
  .min-size-xs { min-width: 20rem; min-height: 20rem }
  .max-size-1 { max-width: 0.25rem; max-height: 0.25rem }
  .max-size-\[1px\] { max-width: 1px; max-height: 1px }
  ```

  <br>
</details>

<details>
  <summary>elevation - Vuetify 海拔样式</summary>
  <br>

>  1. 类名 `elevation` 可简写为 `el`
>  2. 可选的前缀 `shadow-`
>  3. 透明度支持 `(el|elevation)-(op|opacity)-(0~100)` 或 `shadow-(op|opacity)-(0~100)` 的方式

  ```html
  <!-- 正常使用 -->
  <div class="el-1" />
  <div class="elevation-2" />
  <div class="shadow-el-3" />
  <div class="shadow-elevation-4" />
  <!-- 透明度 -->
  <div class="el-5 el-op-50" />
  <div class="el-6 shadow-op-50" />
  ```

  在 [Attributify Mode](https://github.com/unocss/unocss/tree/main/packages/preset-attributify) 下使用

  ```html
  <div el="1 op-50" />
  <div elevation="1 op-50" />
  <div shadow-elevation="1 op-50" />
  ```

  <br>
</details>

<details>
  <summary>animated - <a href="https://animate.style" target="_blank">animate.css</a> 的 Unocss 版本</summary>
  <br>

  样式名称

  ```html
  <!-- 动画名称 ( 动画名称可在 https://animate.style 查阅, 使用时需转为 `kebabCase` 短横线隔开的格式 ) -->
  <div class="animated animated-bounce" />
  <div class="animated animated-fade-in" />
  <div class="animated animated-fade-out" />

  <!-- 动画运行次数 -->
  <div class="animated animated-bounce animated-infinite" /> <!-- 无限循环 -->
  <div class="animated animated-bounce animated-repeat-6" /> <!-- 循环 6 次 -->
  <div class="animated animated-bounce animated-repeat-666" /> <!-- 循环 666 次 -->

  <!-- 动画延迟 -->
  <div class="animated animated-bounce animated-delay-6" /> <!-- 延迟 6 毫秒 -->
  <div class="animated animated-bounce animated-delay-6s" /> <!-- 延迟 6 秒 -->
  <div class="animated animated-bounce animated-delay-6ms" /> <!-- 延迟 6 毫秒 -->

  <!-- 动画周期 -->
  <div class="animated animated-bounce animated-fast" /> <!-- 快 -->
  <div class="animated animated-bounce animated-faster" /> <!-- 很快 -->
  <div class="animated animated-bounce animated-slow" /> <!-- 慢 -->
  <div class="animated animated-bounce animated-slower" /> <!-- 很慢 -->
  <div class="animated animated-bounce animated-duration-6" /> <!-- 时长为 6 毫秒 -->
  <div class="animated animated-bounce animated-duration-6s" /> <!-- 时长为 6 秒 -->
  <div class="animated animated-bounce animated-duration-6ms" /> <!-- 时长为 6 毫秒 -->
  ```

  在 [Attributify Mode](https://github.com/unocss/unocss/tree/main/packages/preset-attributify) 下使用

  ```html
  <div animated="~ bounce infinite" />
  <div animated="~ bounce faster delay-6s" />
  ```

  在 Vue 3 中使用

  ```html
  <Transition class="animated animated-faster" enter-active-class="animated-rotate-in" leave-active-class="animated-rotate-out" mode="out-in">
    ...
  </Transition>
  ```
</details>

<br>

## 安装

```bash
npm install unocss-preset-extra -D
```

<br>

## 使用

```js
// unocss.config.ts
import { defineConfig, presetAttributify, presetUno } from 'unocss';
import { presetExtra } from 'unocss-preset-extra';

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetExtra(),
  ],
});
```

<br>

## License

unocss-preset-extra is licensed under a [MIT License](./LICENSE).
