interface ImportMetaEnv {
  /** 默认语言 */
  readonly APP_DEFAULT_LOCALE: string
  /** 主机名 ( 目前用于配置站点地图, 上线前需要更改成正式环境的域名 ) */
  readonly APP_HOSTNAME: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
