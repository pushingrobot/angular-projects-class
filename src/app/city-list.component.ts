import { Component } from "@angular/core";

interface ICity {
    imageSrc: string;
    name: string;
    woeId: string;
}

/** CityListComponent */
@Component({
    selector: "city-list",
    templateUrl: "./city-list.component.html",
})
export class CityListComponent {
    /** City List */
    public cities?: ICity[] = undefined;
}
