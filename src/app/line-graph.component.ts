import {AfterViewInit, Component, ElementRef, Input, ViewChild} from "@angular/core";
import * as Chart from "chart.js";

/** TODO */
@Component({
    selector: "line-graph",
    templateUrl: "./graph.component.html",
})
export class LineGraphComponent implements AfterViewInit {
    /** TODO */
    @ViewChild("canvas") private canvas: ElementRef;
    /** TODO */
    @Input() private data: number[];

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
                    type: "line",
                    data: {
                        labels: this.data,
                        datasets: [
                            {
                                fill: false,
                                lineTension: 0.3,
                                backgroundColor: "rgba(75,192,192,0.4)",
                                borderColor: "rgba(75,192,192,1)",
                                borderCapStyle: "butt",
                                borderDash: [],
                                borderDashOffset: 0,
                                borderJoinStyle: "miter",
                                pointBorderColor: "rgba(75,192,192,1)",
                                pointBackgroundColor: "#fff",
                                pointBorderWidth: 1,
                                pointHoverRadius: 5,
                                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                                pointHoverBorderColor: "rgba(220,220,220,1)",
                                pointHoverBorderWidth: 2,
                                pointRadius: 1,
                                pointHitRadius: 10,
                                data: this.data,
                                spanGaps: false,
                            },
                        ],
                    },
                    options: {
                        legend: {
                            display: false,
                        },
                        scales: {
                            xAxes: [{
                                display: false,
                            }],
                            yAxes: [yScale],
                        },
                    },
                });

                const refreshInterval: number = 1000;
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
