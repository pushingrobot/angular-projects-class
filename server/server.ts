import * as express from "express";

import * as compression from "compression";
import * as cors from "cors";
import * as http from "http";
import * as https from "https";
import * as path from "path";

process.on("uncaughtException", console.error);

const app: express.Express = express();
const defaultPort: number = 4201;

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

app.get("/api/weather/:woeId", function (req, res) {
    const woeId = req.params.woeId;
    const requestPath = "/v1/public/yql?q=select%20item.condition.code%2C%20item.condition.temp%20from%20weather.forecast%20" +
        `where%20woeid%3D${woeId}%20and%20u%3D'c'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`;
    return https.get({
        host: "query.yahooapis.com",
        path: requestPath
    }, function(response) {
        var body = "";
        response.on("data", function (d) {
            body += d;
        });
        response.on("end", function () {
            const parsed = JSON.parse(body);
            res.status(200).send(parsed);
        });
    });
});

// app.get("*", function (req, res) {
//     res.sendFile(__dirname + "/../client/index.html");
// });

const server: http.Server = app.listen(app.get("port"), () => {
  const host: string = server.address().address;
  const port: number = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});
