import type { App, Plugin } from "vue";
import * as UIComponents from "./ui";
import * as SelectComponents from "./ui/select";

const components: Record<string, unknown> = {
  ...UIComponents,
  ...SelectComponents,
};

export function registerComponents(app: App): void {
  Object.entries(components).forEach(([name, component]) => {
    app.component(name, component as Parameters<App["component"]>[1]);
  });
}

export const globalComponentsPlugin: Plugin = {
  install(app: App) {
    registerComponents(app);
  },
};

export default globalComponentsPlugin;
