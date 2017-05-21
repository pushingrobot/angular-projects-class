import { Component, OnInit } from "@angular/core";

import { DataService, ITweet } from "./data.service";
import { TwitterService } from "./twitter.service";

import * as io from "socket.io-client";
import {ioToken} from "./di";

/** AppComponent */
@Component({
    providers: [
        DataService,
        TwitterService,
        {provide: ioToken, useValue: io},
    ],
    selector: "my-app",
    templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
    /** TODO */
    public topHashtags: string[] = this.data.topHashtags;
    /** TODO */
    public topHashtagsCount: number[] = this.data.topHashtagsCount;
    /** TODO */
    public topWords: string[] = this.data.topWords;
    /** TODO */
    public topWordsCount: number[] = this.data.topWordsCount;
    /** TODO */
    public tweets: ITweet[] = this.data.tweets;
    /** TODO */
    public tweetsOverTime: number[] = this.data.tweetsOverTime;

    public constructor(private data: DataService, private twitter: TwitterService) {}

    /** TODO */
    public getTweetCount = (): number => this.data.totalCount;

    /** TODO */
    public ngOnInit(): void {
        this.data.setSource(this.twitter.startStreaming());
    }
}
