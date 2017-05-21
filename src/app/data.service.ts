import {Injectable} from "@angular/core";
import * as moment from "moment";
import {Observable} from "rxjs";

interface ITextAndCount {
    count: number;
    text: string;
}

// > interface IDateAndCount {
// >     count: number;
// >     date: moment.Moment;
// > }

export interface ITweet {
    date: moment.Moment;
    text: string;
}

/** TODO */
// tslint:disable-next-line
@Injectable()
export class DataService {
    /** TODO */
    public topHashtags: string[] = [];
    /** TODO */
    public topHashtagsCount: number[] = [];
    /** TODO */
    public topWords: string[] = [];
    /** TODO */
    public topWordsCount: number[] = [];
    /** TODO */
    public totalCount: number = 0;
    /** TODO */
    public tweets: ITweet[] = [];
    /** TODO */
    public tweetsOverTime: number[] = [];

    /** TODO */
    private hashtags: Map<string, number> = new Map<string, number>();
    /** TODO */
    private stopwords: string[] = [
      "a", "able", "about", "above", "according", "accordingly", "across", "actually", "after", "afterwards",
      "again", "against", "ain't", "all", "allow", "allows", "almost", "alone", "along", "already", "also", "although",
      "always", "am", "among", "amongst", "an", "and", "another", "any", "anybody", "anyhow", "anyone", "anything",
      "anyway", "anyways", "anywhere", "apart", "appear", "appreciate", "appropriate", "are", "aren't", "around",
      "as", "aside", "ask", "asking", "associated", "at", "available", "away", "awfully", "be", "became", "because",
      "become", "becomes", "becoming", "been", "before", "beforehand", "behind", "being", "believe", "below", "beside",
      "besides", "best", "better", "between", "beyond", "both", "brief", "but", "by", "c'mon", "c's", "came", "can",
      "can't", "cannot", "cant", "cause", "causes", "certain", "certainly", "changes", "clearly", "co", "com", "come",
      "comes", "concerning", "consequently", "consider", "considering", "contain", "containing", "contains",
      "corresponding", "could", "couldn't", "course", "currently", "definitely", "described", "despite", "did",
      "didn't", "different", "do", "does", "doesn't", "doing", "don't", "done", "down", "downwards", "during", "each",
      "edu", "eg", "eight", "either", "else", "elsewhere", "enough", "entirely", "especially", "et", "etc", "even",
      "ever", "every", "everybody", "everyone", "everything", "everywhere", "ex", "exactly", "example", "except",
      "far", "few", "fifth", "first", "five", "followed", "following", "follows", "for", "former", "formerly", "forth",
      "four", "from", "further", "furthermore", "get", "gets", "getting", "given", "gives", "go", "goes", "going",
      "gone", "got", "gotten", "greetings", "had", "hadn't", "happens", "hardly", "has", "hasn't", "have", "haven't",
      "having", "he", "he's", "hello", "help", "hence", "her", "here", "here's", "hereafter", "hereby", "herein",
      "hereupon", "hers", "herself", "hi", "him", "himself", "his", "hither", "hopefully", "how", "howbeit", "however",
      "i'd", "i'll", "i'm", "i've", "ie", "if", "ignored", "immediate", "in", "inasmuch", "inc", "indeed", "indicate",
      "indicated", "indicates", "inner", "insofar", "instead", "into", "inward", "is", "isn't", "it", "it'd", "it'll",
      "it's", "its", "itself", "just", "keep", "keeps", "kept", "know", "known", "knows", "last", "lately", "later",
      "latter", "latterly", "least", "less", "lest", "let", "let's", "like", "liked", "likely", "little", "look",
      "looking", "looks", "ltd", "mainly", "many", "may", "maybe", "me", "mean", "meanwhile", "merely", "might",
      "more", "moreover", "most", "mostly", "much", "must", "my", "myself", "name", "namely", "nd", "near", "nearly",
      "necessary", "need", "needs", "neither", "never", "nevertheless", "new", "next", "nine", "no", "nobody", "non",
      "none", "noone", "nor", "normally", "not", "nothing", "novel", "now", "nowhere", "obviously", "of", "off",
      "often", "oh", "ok", "okay", "old", "on", "once", "one", "ones", "only", "onto", "or", "other", "others",
      "otherwise", "ought", "our", "ours", "ourselves", "out", "outside", "over", "overall", "own", "particular",
      "particularly", "per", "perhaps", "placed", "please", "plus", "possible", "presumably", "probably", "provides",
      "que", "quite", "qv", "rather", "rd", "re", "really", "reasonably", "regarding", "regardless", "regards",
      "relatively", "respectively", "right", "said", "same", "saw", "say", "saying", "says", "second", "secondly",
      "see", "seeing", "seem", "seemed", "seeming", "seems", "seen", "self", "selves", "sensible", "sent", "serious",
      "seriously", "seven", "several", "shall", "she", "should", "shouldn't", "since", "six", "so", "some", "somebody",
      "somehow", "someone", "something", "sometime", "sometimes", "somewhat", "somewhere", "soon", "sorry",
      "specified", "specify", "specifying", "still", "sub", "such", "sup", "sure", "t's", "take", "taken", "tell",
      "tends", "th", "than", "thank", "thanks", "thanx", "that", "that's", "thats", "the", "their", "theirs", "them",
      "themselves", "then", "thence", "there", "there's", "thereafter", "thereby", "therefore", "therein", "theres",
      "thereupon", "these", "they", "they'd", "they'll", "they're", "they've", "think", "third", "this", "thorough",
      "thoroughly", "those", "though", "three", "through", "throughout", "thru", "thus", "to", "together", "too",
      "took", "toward", "towards", "tried", "tries", "truly", "try", "trying", "twice", "two", "un", "under",
      "unfortunately", "unless", "unlikely", "until", "unto", "up", "upon", "us", "use", "used", "useful", "uses",
      "using", "usually", "value", "various", "very", "via", "viz", "vs", "want", "wants", "was", "wasn't", "way",
      "we", "we'd", "we'll", "we're", "we've", "welcome", "well", "went", "were", "weren't", "what", "what's",
      "whatever", "when", "whence", "whenever", "where", "where's", "whereafter", "whereas", "whereby", "wherein",
      "whereupon", "wherever", "whether", "which", "while", "whither", "who", "who's", "whoever", "whole", "whom",
      "whose", "why", "will", "willing", "wish", "with", "within", "without", "won't", "wonder", "would", "wouldn't",
      "yes", "yet", "you", "you'd", "you'll", "you're", "you've", "your", "yours", "yourself", "yourselves", "zero",
    ];
    /** TODO */
    private topSize: number = 8;
    /** TODO */
    private tweetsOverTimeData: number[] = [];
    /** TODO */
    private tweetsOverTimeIntervals: moment.Moment[] = [];
    /** TODO */
    private words: Map<string, number> = new Map<string, number>();

    public constructor() {
        const additionalWords: string[] = ["amp", "https", "i", "rt"];
        this.stopwords.forEach((x: string) => {
            const noPunctuation: string = x.replace(/[^\w\s]|_/g, "");
            if (noPunctuation !== x) {
                additionalWords.push(noPunctuation);
            }
        });
        this.stopwords = this.stopwords.concat(additionalWords);
    }

    /** TODO */
    public setSource(observable: Observable<Twitter.Status>): void {
        observable
            .subscribe((x: Twitter.Status) => {
                this.updateHashtags(x.entities.hashtags);
                this.updateWords(x.text);
                this.updateTweetCountOverTime(moment(Number(x.timestamp_ms)));
                this.updateTweets(x.timestamp_ms, x.text);
                this.totalCount++;
            });
    }

    /** TODO */
    private getTopMapValues(map: Map<string, number>, limit: number, includeOther?: boolean): ITextAndCount[] {
        const values: ITextAndCount[] = [];
        map.forEach((count: number, language: string) => {
            values.push({text: language, count});
        });
        values.sort(this.sortByCount);
        const topValues: ITextAndCount[] = values.splice(0, limit);
        if (includeOther === true) {
            const remainingCount: number = values.reduce(
                (sum: number, currentElement: ITextAndCount) => sum + currentElement.count,
                0,
            );
            topValues.push({text: "Other", count: remainingCount});
        }

        return topValues;
    }

    /** TODO */
    private sortByCount(a: {count: number}, b: {count: number}): number {
        return a.count > b.count ?
            -1 :
            a.count < b.count ?
                1 :
                0;
    }
    /** TODO */
    private updateAggregateList(list: Map<string, number>, keyToIncrement: string): void {
        const value: number|undefined = list.get(keyToIncrement);
        const count: number = (typeof value !== "undefined") ? value : 0;
        list.set(keyToIncrement, count + 1);
    }

    /** TODO */
    private updateArray(target: Array<{}>, source: Array<{}>): void {
        for (let i: number = 0; i < source.length; i++) {
            target[i] = source[i];
        }
        target.length = source.length;
    }
    /** TODO */
    private updateHashtags(hashtags: Twitter.HashtagEntity[]): void {
        hashtags
            .map((x: Twitter.HashtagEntity) => x.text.toLowerCase())
            .forEach((x: string) => { this.updateAggregateList(this.hashtags, x); });
        const top: ITextAndCount[] = this.getTopMapValues(this.hashtags, this.topSize);
        this.updateArray(this.topHashtags, top.map((x: ITextAndCount) => x.text));
        this.updateArray(this.topHashtagsCount, top.map((x: ITextAndCount) => x.count));
        console.log(this.topHashtagsCount, this.topHashtags);
    }
    /** TODO */
    private updateTweetCountOverTime(createdAt: moment.Moment): void {
        const currentBucket: moment.Moment = createdAt.milliseconds(0).clone();
        if (this.tweetsOverTimeData.length === 0) {
            this.tweetsOverTimeData.push(1);
            this.tweetsOverTimeIntervals.push(currentBucket);
        } else {
            const lastBucket: moment.Moment = this.tweetsOverTimeIntervals[this.tweetsOverTimeIntervals.length - 1];
            const lastBucketDate: moment.Moment = lastBucket.clone();
            const missingBuckets: number = Math.floor(createdAt.diff(lastBucketDate, "seconds"));
            for (let i: number = 0; i < missingBuckets; i++) {
                lastBucketDate.add(1, "seconds");
                this.tweetsOverTimeIntervals.push(lastBucketDate.clone());
                this.tweetsOverTimeData.push(0);
            }
            this.tweetsOverTimeData[this.tweetsOverTimeData.length - 1]++;
        }
        // Don't show the last element as that timeframe is still in progress.
        for (let i: number = this.tweetsOverTime.length; i < this.tweetsOverTimeData.length - 1; i++) {
            this.tweetsOverTime[i] = this.tweetsOverTimeData[i];
        }
    }
    /** TODO */
    private updateTweets(timestampMs: string, text: string): void {
        this.tweets.push({date: moment(Number(timestampMs)), text});
    }
    /** TODO */
    private updateWords(text: string): void {
        text
            .replace(/[^\w\s]|_/g, "")
            .split(" ")
            .map((x: string) => x.toLowerCase())
            .filter((x: string) => x !== "" && this.stopwords.indexOf(x) === -1)
            .forEach((x: string) => { this.updateAggregateList(this.words, x); });
        const top: ITextAndCount[] = this.getTopMapValues(this.words, this.topSize);
        this.updateArray(this.topWords, top.map((x: ITextAndCount) => x.text));
        this.updateArray(this.topWordsCount, top.map((x: ITextAndCount) => x.count));
    }
}
