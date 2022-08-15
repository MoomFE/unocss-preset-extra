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


## 内置的规则

<details>
  <summary>size</summary>

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
</details>

<br>

## License

unocss-preset-extra is licensed under a [MIT License](./LICENSE).