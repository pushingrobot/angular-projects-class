import { Pipe, PipeTransform } from "@angular/core";
import { Moment } from "moment";

/** TODO */
@Pipe({
    name: "moment",
})
export class MomentPipe implements PipeTransform {
    /** TODO */
    public transform(moment: Moment): string {
        return moment.format("llll");
    }
}
