import { Pipe, PipeTransform } from "@angular/core";
import { ITweet } from "./data.service";

/** TODO */
@Pipe({
    name: "tweetFilter",
    pure: false,
})
export class TweetFilterPipe implements PipeTransform {
    /** TODO */
    public transform(tweets: ITweet[], term?: string): ITweet[] {
        switch (term) {
            case undefined:
            case "":
                return tweets;
            default:
                const termUpper: string = term.toUpperCase();
                console.log("filtering");

                return tweets.filter((t: ITweet) => t.text.toUpperCase().includes(termUpper));
        }
    }
}
