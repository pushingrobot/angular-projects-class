import { AfterViewInit, Component, ElementRef, Input, ViewChild } from "@angular/core";
import * as Chart from "chart.js";

/** TODO */
@Component({
    selector: "bar-graph",
    templateUrl: "./graph.component.html",
})
export class BarGraphComponent implements AfterViewInit {
    /** TODO */
    @ViewChild("canvas") private canvas: ElementRef;
    /** TODO */
    @Input() private data: number[];
    /** TODO */
    @Input() private labels: string[];

    /** TODO */
    public ngAfterViewInit(): void {
        const element: HTMLCanvasElement|undefined = this.canvas.nativeElement as HTMLCanvasElement|undefined;
        if (element instanceof HTMLCanvasElement) {
            const context: CanvasRenderingContext2D|null = element.getContext("2d");
            if (context instanceof CanvasRenderingContext2D) {
                const yScale: Chart.LinearScale = {
                    ticks: {
                        beginAtZero: true,
                    },
                };
                const chart: Chart = new Chart(context, {
                    type: "bar",
                    data: {
                        labels: this.labels,
                        datasets: [{
                            label: "Count",
                            data: this.data,
                            backgroundColor: [
                                "rgba(255, 99, 132, 0.2)",
                                "rgba(54, 162, 235, 0.2)",
                                "rgba(255, 206, 86, 0.2)",
                                "rgba(75, 192, 192, 0.2)",
                                "rgba(153, 102, 255, 0.2)",
                                "rgba(255, 159, 64, 0.2)",
                                "rgba(255, 99, 132, 0.2)",
                                "rgba(54, 162, 235, 0.2)",
                            ],
                            borderColor: [
                                "rgba(255,99,132,1)",
                                "rgba(54, 162, 235, 1)",
                                "rgba(255, 206, 86, 1)",
                                "rgba(75, 192, 192, 1)",
                                "rgba(153, 102, 255, 1)",
                                "rgba(255, 159, 64, 1)",
                                "rgba(255,99,132,1)",
                                "rgba(54, 162, 235, 1)",
                            ],
                            borderWidth: 1,
                        }],
                    },
                    options: {
                        scales: {
                            yAxes: [yScale],
                        },
                    },
                });
                const refreshInterval: number = 5000;
                setInterval(() => {
                    // tslint:disable-next-line
                    chart.update();
                },
                    // tslint:disable-next-line:align
                    refreshInterval,
                );
            }
        }
    }
}
