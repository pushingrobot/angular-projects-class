import { Component, OnInit } from "@angular/core";

interface ICityWeather {
    city: string;
    code: number;
    temperature: string;
}

/** CityWeatherComponent */
@Component({
    templateUrl: "./city-weather.component.html",
})
export class CityWeatherComponent implements OnInit {
    /** Weather */
    public weather?: ICityWeather;

    /** Setup */
    public ngOnInit(): void {
        this.weather = undefined;
    }

    /** Weather info available? */
    public weatherExists(): boolean {
        return typeof this.weather !== "undefined";
    }

}
