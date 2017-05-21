import { Inject, Injectable } from "@angular/core";
import { Observable, Observer } from "rxjs";
import { ioToken } from "./di";

@Injectable() // tslint:disable-line
export class TwitterService {
    /** TODO */
    private socket?: SocketIOClient.Socket;
    /** TODO */
    private streamingEndpoint: string = "localhost:4201";

    /** TODO */

    public constructor(@Inject(ioToken) private io: SocketIOClientStatic) { }

    /** TODO */
    public startStreaming(): Observable<Twitter.Status> {
        if (typeof this.socket === "undefined") {
            this.socket = this.io.connect(this.streamingEndpoint);
        }
        if (!this.socket.connected) {
            this.socket.connect();
        }
        const tweets: Observable<Twitter.Status> = Observable.create((observer: Observer<Twitter.Status>): void => {
            if (typeof this.socket !== "undefined") {
                this.socket.on("tweet", (tweet: Twitter.Status) => {
                    if (tweet.lang === "en") {
                        observer.next(tweet);
                    }
                });
            }
        }) as Observable<Twitter.Status>;
        this.socket.emit("stream");

        return tweets;
    }

    /** TODO */
    public stopStreaming(): void {
        if (typeof this.socket !== "undefined") {
            this.socket.disconnect();
        }
    }
}
