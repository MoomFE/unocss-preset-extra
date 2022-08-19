## [Unreleased]
 - 🌟 新增使用 `(shadow-)?elevation-(op|opacity)-(0~100)` 的方式为海拔样式设置透明度, 减淡阴影效果
 - ⚠️ 移除使用 `-fade` 的方式减淡阴影效果, 使用 `(shadow-)?elevation-(op|opacity)-50` 写法获得同等效果
 - 🐞 修复使用海拔样式时, 使用非 `0~24` 海拔时, 会返回错误样式的问题

## [v0.2.1]
  - 📅 2022-08-15
  - 🐞 修复海拔样式的 autocomplete 错误

## [v0.2.0]
 - 📅 2022-08-15
 - 🌟 新增使用 `(shadow-)?elevation-(0~24)(-fade)?` 的方式生成 Vuetify 海拔样式

## [v0.1.1]
 - 📅 2022-05-24
 - 💄 更新 `package.json` 的 `peerDependencies` 字段中要求的 `unocss` 版本

## [v0.1.0]
 - 📅 2022-05-04
 - 🌟 新增使用 `(min-|max-)?size-*` 的方式同时定义宽高

<br>
<hr>
<br>

版本规范

1. 主版本号: 破坏性更新和新特性
2. 次版本号: 向下兼容的功能新增、功能更改、功能优化
3. 修订版本号: 向下兼容的问题修正、一般功能优化

<br>
<hr>
<br>

CHANGELOG 图标规范

- 🌟: 功能新增<br>
- 💄: 功能更改、功能优化<br>
- ⚠️: 与上一版本可能不兼容的功能更改<br>
- 🐞: 问题修正<br>
- 📅: 版本发布日期

<br>
<hr>
<br>

[Unreleased]: https://github.com/MoomFE/unocss-preset-extra/compare/v0.2.1...HEAD
[v0.2.1]: https://github.com/MoomFE/unocss-preset-extra/releases/tag/v0.2.1
[v0.2.0]: https://github.com/MoomFE/unocss-preset-extra/releases/tag/v0.2.0
[v0.1.1]: https://github.com/MoomFE/unocss-preset-extra/releases/tag/v0.1.1
[v0.1.0]: https://github.com/MoomFE/unocss-preset-extra/releases/tag/v0.1.0