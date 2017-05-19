import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import "rxjs/add/operator/toPromise";

interface IWeatherApiResponse {
    query: {
        count: number;
        created: string;
        lang: string;
        results: {
            channel: {
                item: {
                    condition: {
                        code: string;
                        temp: string;
                    };
                };
            };
        };
    };
}

export interface IWeatherInformation {
    city?: string;
    code: number;
    temperature: number;
}

export interface ICity {
    imageSrc: string;
    name: string;
    woeId: string;
}

/** Weather Service */
@Injectable() // tslint:disable-line
export class WeatherService {
    /** City list */
    public cities: ICity[] = [
        { name: "Bogota", imageSrc: "images/bogota.jpg", woeId: "368148" },
        { name: "Cape Town", imageSrc: "images/cape-town.jpg", woeId: "1591691" },
        { name: "London", imageSrc: "images/london.jpg", woeId: "44418" },
        { name: "New Delhi", imageSrc: "images/delhi.jpg", woeId: "28743736" },
        { name: "New York", imageSrc: "images/new-york.jpg", woeId: "2459115" },
        { name: "Paris", imageSrc: "images/paris.jpg", woeId: "615702" },
        { name: "Sydney", imageSrc: "images/sydney.jpg", woeId: "1105779" },
        { name: "Tokyo", imageSrc: "images/tokyo.jpg", woeId: "1118370" },
        { name: "Vancouver", imageSrc: "images/vancouver.jpg", woeId: "9807" },
    ];

    public constructor(private http: Http) { }

    /** TODO */
    public async getWeather(woeId: string): Promise<IWeatherInformation> {
        const url: string = this.generateWeatherUrl(woeId);

        return this.http.get(url).toPromise().then((x: Response): IWeatherInformation => {
            const apiResponse: IWeatherApiResponse = x.json() as IWeatherApiResponse;
            const weather: {code: string, temp: string} = apiResponse.query.results.channel.item.condition;

            return {
                city: this.getCityName(woeId),
                code: Number(weather.code),
                temperature: Number(weather.temp),
            };
        });
    }

    /** TODO */
    private generateWeatherUrl(woeId: string): string {
        console.log(this.cities);

        return `http://localhost:4201/api/weather/${woeId}`;
    }

    /** TODO */
    private getCityName(woeId: string): string|undefined {
        const matches: ICity[] = this.cities.filter((x: ICity) => x.woeId === woeId);

        return matches.length === 1 ? matches[0].name : undefined;
    }

}
