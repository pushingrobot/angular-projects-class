import * as express from "express";

import * as compression from "compression";
import * as cors from "cors";
import * as http from "http";
import * as https from "https";
import * as path from "path";

process.on("uncaughtException", console.error);

const app: express.Express = express();
const defaultPort: number = 4201;
const STATUS_OK: number = 200;

app.set("port", defaultPort);
app.use(compression());
app.use(cors());

// Serve Angular files
app.use(express.static(path.join(__dirname, "/../client")));
app.use(express.static(path.join(__dirname, "/../public")));

// Respond with "hello world" when a GET request is made to the homepage
// >app.get("/", (_: express.Request, res: express.Response): void => {
// >  res.send("hello world");
// >});

app.get("/api/weather/:woeId", (req: express.Request, res: express.Response) => {
    const woeId: string|undefined = (req.params as {woeId?: string}).woeId;
    const requestPath: string =
        `/v1/public/yql?q=select%20item.condition.code%2C%20item.condition.temp%20from%20weather.forecast%20` +
        `where%20woeid%3D${woeId}%20and%20u%3D'c'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`;

    return https.get(
        {
            host: "query.yahooapis.com",
            path: requestPath,
        },
        (response: http.IncomingMessage): void => {
            let body: string = "";
            response.on("data", (d: string): void => {
                body += d;
            });
            response.on("end", (): void => {
                res.status(STATUS_OK).send(JSON.parse(body));
            });
        });
});

app.get("*", (_: express.Request, res: express.Response) => {
    res.sendFile(path.join(__dirname, "/../client/index.html"));
});

const server: http.Server = app.listen(app.get("port"), () => {
  const host: string = server.address().address;
  const port: number = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});
