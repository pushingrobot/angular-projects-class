import { Component, Input } from "@angular/core";
import { ITweet } from "./data.service";

/** TODO */
@Component({
    selector: "tweet-list",
    templateUrl: "./tweet-list.component.html",
})
export class TweetList {
    /** TODO */
    @Input() public tweets: ITweet[];
    /** TODO */
    private searchTerm: string;
    /** TODO */
    public clearSearchTerm(): void {
        this.searchTerm = "";
    }
}
