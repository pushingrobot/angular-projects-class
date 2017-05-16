import "./polyfills.browser";

import { NgModuleRef, PlatformRef } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app/app.module";

export const platformRef: PlatformRef = platformBrowserDynamic();

/** TODO */
export function main(): void|Promise<NgModuleRef<AppModule>> {
  return platformRef.bootstrapModule(AppModule)
    .catch((err: Error) => { console.error(err); });
}

// Support async tag or hmr
switch (document.readyState) {
  case "interactive":
  case "complete":
    main();
    break;
  case "loading":
  default:
    document.addEventListener("DOMContentLoaded", main);
}
