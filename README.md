# unocss-preset-extra

[UnoCSS](https://github.com/unocss/unocss) 扩展, 提供类名简写及额外一些样式预设

[![npm](https://img.shields.io/npm/v/unocss-preset-extra.svg)](https://www.npmjs.com/package/unocss-preset-extra)
[![Downloads](https://img.shields.io/npm/dm/unocss-preset-extra.svg)](https://www.npmjs.com/package/unocss-preset-extra)

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

  这将生成以下 css 代码

  ```css
  .el-1 { box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, calc(0.2 * var(--une-el-opacity, var(--un-shadow-opacity, 1)))), 0px 1px 1px 0px rgba(0, 0, 0, calc(0.14 * var(--une-el-opacity, var(--un-shadow-opacity, 1)))), 0px 1px 3px 0px rgba(0, 0, 0, calc(0.12 * var(--une-el-opacity, var(--un-shadow-opacity, 1)))) }
  .elevation-2 { box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, calc(0.2 * var(--une-el-opacity, var(--un-shadow-opacity, 1)))), 0px 2px 2px 0px rgba(0, 0, 0, calc(0.14 * var(--une-el-opacity, var(--un-shadow-opacity, 1)))), 0px 1px 5px 0px rgba(0, 0, 0, calc(0.12 * var(--une-el-opacity, var(--un-shadow-opacity, 1)))) }
  .shadow-el-3 { box-shadow: 0px 3px 3px -2px rgba(0, 0, 0, calc(0.2 * var(--une-el-opacity, var(--un-shadow-opacity, 1)))), 0px 3px 4px 0px rgba(0, 0, 0, calc(0.14 * var(--une-el-opacity, var(--un-shadow-opacity, 1)))), 0px 1px 8px 0px rgba(0, 0, 0, calc(0.12 * var(--une-el-opacity, var(--un-shadow-opacity, 1)))) }
  .shadow-elevation-4 { box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, calc(0.2 * var(--une-el-opacity, var(--un-shadow-opacity, 1)))), 0px 4px 5px 0px rgba(0, 0, 0, calc(0.14 * var(--une-el-opacity, var(--un-shadow-opacity, 1)))), 0px 1px 10px 0px rgba(0, 0, 0, calc(0.12 * var(--une-el-opacity, var(--un-shadow-opacity, 1)))) }
  .el-5 { box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, calc(0.2 * var(--une-el-opacity, var(--un-shadow-opacity, 1)))), 0px 5px 8px 0px rgba(0, 0, 0, calc(0.14 * var(--une-el-opacity, var(--un-shadow-opacity, 1)))), 0px 1px 14px 0px rgba(0, 0, 0, calc(0.12 * var(--une-el-opacity, var(--un-shadow-opacity, 1)))) }
  .el-6 { box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, calc(0.2 * var(--une-el-opacity, var(--un-shadow-opacity, 1)))), 0px 6px 10px 0px rgba(0, 0, 0, calc(0.14 * var(--une-el-opacity, var(--un-shadow-opacity, 1)))), 0px 1px 18px 0px rgba(0, 0, 0, calc(0.12 * var(--une-el-opacity, var(--un-shadow-opacity, 1)))) }
  .el-op-50 { --une-el-opacity: 0.5 }
  .shadow-op-50 { --un-shadow-opacity: 0.5 }
  ```

  <br>
</details>

<details>
  <summary>animated - <a href="https://animate.style/" target="_blank">animate.css</a> 的 Unocss 版本</summary>
  <br>

  样式名称

  ```html
  <!-- 动画名称 -->
  <div class="animated animated-bounce" />
  <div class="animated animated-fade-in" />
  <div class="animated animated-fade-out" />

  <!-- 动画运行次数 -->
  <div class="animated animated-bounce animated-infinite" />
  <div class="animated animated-bounce animated-repeat-2" />
  <div class="animated animated-bounce animated-repeat-666" />

  <!-- 动画延迟 -->
  <div class="animated animated-bounce animated-delay-1" />
  <div class="animated animated-bounce animated-delay-1s" />
  <div class="animated animated-bounce animated-delay-1ms" />

  <!-- 动画周期 -->
  <div class="animated animated-bounce animated-fast" />
  <div class="animated animated-bounce animated-faster" />
  <div class="animated animated-bounce animated-slow" />
  <div class="animated animated-bounce animated-slower" />
  <div class="animated animated-bounce animated-duration-1" />
  <div class="animated animated-bounce animated-duration-1s" />
  <div class="animated animated-bounce animated-duration-1ms" />
  ```

  在 Vue 3 中使用

  ```html
  <Transition class="animated animated-faster" enter-active-class="animated-rotateIn" leave-active-class="animated-rotateOut" mode="out-in">
    ...
  </Transition>
  ```
</details>

<br>

## License

unocss-preset-extra is licensed under a [MIT License](./LICENSE).
