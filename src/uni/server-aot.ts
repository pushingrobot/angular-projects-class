import { enableProdMode } from "@angular/core";
import * as express from "express";
import "zone.js/dist/zone-node";
import { AppServerModuleNgFactory } from "../../aot/src/uni/app.server.ngfactory"; // tslint:disable-line
import { ngUniversalEngine } from "./universal-engine";

enableProdMode();

const DEFAULT_PORT: number = 3200;

const server: express.Express = express();

// Set our angular engine as the handler for html files, so it will be used to render them.
server.engine("html", ngUniversalEngine({
    bootstrap: [AppServerModuleNgFactory],
}));

// Set default view directory
server.set("views", "src");

// Handle requests for routes in the app.  ngExpressEngine does the rendering.
server.get(["/", "/dashboard", "/heroes", "/detail/:id"], (req: express.Request, res: express.Response): void => {
    res.render("index-aot.html", { req });
});

// Handle requests for static files
server.get(["/*.js", "/*.css"], (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const fileName: string = req.originalUrl;
    console.log(fileName);
    const root: string = fileName.startsWith("/node_modules/") ? "." : "src";
    res.sendFile(fileName, { root }, (err: Error|undefined) => {
        if (err !== undefined) {
            next(err);
        }
    });
});

// Start the server
server.listen(DEFAULT_PORT, () => {
    console.log("listening on port 3200...");
});
