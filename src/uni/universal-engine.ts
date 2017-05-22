import { NgModuleFactory } from "@angular/core";
import { renderModuleFactory } from "@angular/platform-server";
import * as fs from "fs";
const templateCache: Map<string, string> = new Map<string, string>(); // Cache for page templates
const outputCache: Map<string, string> = new Map<string, string>();   // Cache for rendered pages

/** TODO */
// tslint:disable-next-line:no-any
export function ngUniversalEngine(setupOptions: { bootstrap: Array<NgModuleFactory<any>> }):
    (filePath: string, options: {req: Request}, callback: (err: Error|null, html: string) => void) => void {

  return (filePath: string, options: { req: Request }, callback: (err: Error|null, html: string) => void): void => {
    const url: string = options.req.url;
    const html: string|undefined = outputCache.get(url);
    if (html !== undefined) {
      // Return already-built page for this url
      console.log(`from cache: ${url}`);
      // tslint:disable-next-line:no-null-keyword
      callback(null, html);

      return;
    }
    console.log(`building: ${url}`);
    if (!templateCache.has(filePath)) {
      const file: Buffer = fs.readFileSync(filePath);
      templateCache.set(filePath, file.toString());
    }
    // Render the page via angular platform-server
    // tslint:disable-next-line:no-any
    const appModuleFactory: NgModuleFactory<any> = setupOptions.bootstrap[0];
    // tslint:disable-next-line:no-floating-promises
    renderModuleFactory(appModuleFactory, {
      document: templateCache.get(filePath),
      url,
    }).then((str: string) => {
      outputCache.set(url, str);
      // tslint:disable-next-line:no-null-keyword
      callback(null, str);
    });
  };
}
