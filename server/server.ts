import * as express from "express";

import * as compression from "compression";
import * as cors from "cors";
import * as http from "http";
import * as path from "path";
import * as socketIo from "socket.io";
import * as Twit from "twit";

process.on("uncaughtException", console.error);
process.on("uncaughtException", console.error);

const app: express.Express = express();
const defaultPort: number = 4201;
app.set("port", defaultPort);
const server: http.Server = app.listen(app.get("port"), () => {
  const host: string = server.address().address;
  const port: number = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});
const io: SocketIO.Server = socketIo(server);

app.use(compression());
app.use(cors());

// Serve Angular files
app.use(express.static(path.join(__dirname, "/../client")));
app.use(express.static(path.join(__dirname, "/../public")));

// Respond with "hello world" when a GET request is made to the homepage
// >app.get("/", (_: express.Request, res: express.Response): void => {
// >  res.send("hello world");
// >});

const twit: Twit = new Twit({
    consumer_key: "LcBR3QydIFtnGUyvGogGeBPy5",
    consumer_secret: "dOL6h56ISoBbFG2vwOQnJy6QwlPWzyYMjFcb81zbAeIBejyuuG",
    access_token: "499080236-IQQ3uu1gncT1QYt0rQJTNs3O32zJGlo4Kqrp2NNk",
    access_token_secret: "MnxXTBXjl3YAVocxAmC4P9er2YWSPLJ1JV9S39XGYUO2n",
});

io.on("connection", (socket: SocketIO.Socket) => {
    console.log("Connected to the stream!");

    socket.on("stream", () => {
        const twitter: Twit.StreamingAPIConnection = twit.stream("statuses/sample");

        // Listen to the `connect` event.
        twitter.on("connect", () => {
            console.log("Streaming from the Twitter API...");
        });

        // Emit an event with the Tweet information.
        twitter.on("tweet", (tweet: {}) => {
            io.sockets.emit("tweet", tweet);
        });

        // Listen to the `disconnect`/`stop` events to destroy the connection.
        socket.on("disconnect", () => {
            console.log("Streaming ended (disconnected).");
            twitter.stop();
        });

        socket.on("stop", () => {
            console.log("Streaming ended (stopped).");
            twitter.stop();
        });
    });
});
