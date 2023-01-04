import type { RouteComponent, RouteRecordRaw } from 'vue-router';
import { isESModule, isFunction, isPlainObject, leastRun } from '@moomfe/small-utils';
import { camelCase, upperFirst } from 'lodash';
import { setupLayouts } from 'virtual:generated-layouts';
import generatedRoutes from 'virtual:generated-pages';

/** 定义页面组件名称为路由名称 */
function defineComponentName(route: RouteRecordRaw, component: RouteComponent) {
  if (component.name) return component;
  return Object.assign({}, component, {
    name: upperFirst(camelCase(route.name as string)),
  });
}

/** 遍历路由 */
function eachRoutes(routes: RouteRecordRaw[]) {
  routes.forEach((route) => {
    const component = route.component;

    // 对象形式的页面组件
    if (isPlainObject(component)) {
      route.component = defineComponentName(route, component);
    }
    // 页面组件是一个方法
    else if (isFunction(component)) {
      route.component = () => leastRun(0, component).then((m) => {
        return defineComponentName(route, isESModule(m) ? m.default : m);
      });
    }

    // 存在子路由
    if (route.children)
      eachRoutes(route.children);
  });
}

eachRoutes(generatedRoutes);

export default setupLayouts(generatedRoutes);
