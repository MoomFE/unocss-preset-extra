# unocss-preset-extra

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
  .size-auto { width: auto; height: auto; }
  .size-full { width: 100%; height: 100%; }
  .min-size-1/2 { min-width: 50%; min-height: 50%; }
  .min-size-xs { min-width: 20rem; min-height: 20rem; }
  .max-size-1 { max-width: 0.25rem; max-height: 0.25rem; }
  .max-size-[1px] { max-width: 1px; max-height: 1px; }
  ```

  <br>
</details>

<details>
  <summary>elevation - Vuetify 海拔样式</summary>
  <br>

  ```html
  <div class="elevation-0" />
  <div class="elevation-6" />
  <div class="elevation-24" />
  <div class="elevation-6-fade" />
  <div class="elevation-24-fade" />
  ```

  这将生成以下 css 代码

  ```css
  .elevation-0 { box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12); }
  .elevation-6 { box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12); }
  .elevation-24 { box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12); }
  .elevation-6-fade { box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.1), 0px 6px 10px 0px rgba(0, 0, 0, 0.07), 0px 1px 18px 0px rgba(0, 0, 0, 0.06); }
  .elevation-24-fade { box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.1), 0px 24px 38px 3px rgba(0, 0, 0, 0.07), 0px 9px 46px 8px rgba(0, 0, 0, 0.06); }
  ```

  <br>
</details>

<br>

## License

unocss-preset-extra is licensed under a [MIT License](./LICENSE).