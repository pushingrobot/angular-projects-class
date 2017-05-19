import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { IWeatherInformation, WeatherService } from "./weather.service";

/** CityWeatherComponent */
@Component({
    providers: [WeatherService],
    templateUrl: "./city-weather.component.html",
})
export class CityWeatherComponent implements OnInit {
    /** Weather */
    public weather?: IWeatherInformation = undefined;

    public constructor(private weatherService: WeatherService, private route: ActivatedRoute) {}
    /** Setup */
    public ngOnInit(): void {
        this.route.params.subscribe((params: {woeId: string}) => {
            // tslint:disable-next-line
            this.weatherService.getWeather(params.woeId)
                .then((weather: IWeatherInformation) => this.weather = weather);
        });
    }

    /** Weather info available? */
    public weatherExists(): boolean {
        return typeof this.weather !== "undefined";
    }

}
