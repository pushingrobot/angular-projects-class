import { Component, OnInit } from "@angular/core";

interface ICityWeather {
    city: string;
    code: number;
    temperature: string;
}

/** CityListComponent */
@Component({
    templateUrl: "./city-weather.component.html",
})
export class CityListComponent implements OnInit {
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
