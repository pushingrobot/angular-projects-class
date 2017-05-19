import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { CityListComponent } from "./city-list.component";
import { CityWeatherComponent } from "./city-weather.component";

const routes: Routes = [
    { path: "", component: CityListComponent },
    { path: "weather/:woeId", component: CityWeatherComponent },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
