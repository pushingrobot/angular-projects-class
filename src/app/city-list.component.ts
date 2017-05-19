import { Component, OnInit } from "@angular/core";

import { ICity, WeatherService } from "./weather.service";

/** CityListComponent */
@Component({
    providers: [ WeatherService ],
    selector: "city-list",
    templateUrl: "./city-list.component.html",
})
export class CityListComponent implements OnInit {
    /** City List */
    public cities?: ICity[] = undefined;

    public constructor(private weatherService: WeatherService) {}

    /** TODO */
    public ngOnInit(): void {
        this.cities = this.weatherService.cities;
    }
}
