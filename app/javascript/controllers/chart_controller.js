import { Controller } from "@hotwired/stimulus"

import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default class extends Controller {
    static targets = ['myChart'];
    static values = { chanels: Array };

    initialize() {  
        this.chartInstance = null;
    }

    connect() {
        console.log("Connection established");
    }

    chanelsValueChanged(value, prevValue) {
        if(this.chartInstance) {
            this.chartInstance.destroy();
        }

        this.chartInstance = this.create_chart(value);
    }

    create_chart(chanelValues) {
        chanelValues.map((ch) =>
            console.log(ch.rssi)
        )

        const plugin = {
            id: 'customCanvasBackgroundColor',
            beforeDraw: (chart, args, options) => {
                const {ctx} = chart;
                ctx.save();
                ctx.globalCompositeOperation = 'destination-over';
                ctx.fillStyle = '#1f304f';
                ctx.fillRect(0, 0, chart.width, chart.height);
                ctx.restore();
            }
        };

        return new Chart(this.canvasContext(), {
            type: 'line',
            data: {
                labels: chanelValues.map((ch) => `${ch.frequency} MHz`),
                datasets: [{
                    label: 'RSSI',
                    data: chanelValues.map((ch) => ch.rssi),
                    fill: true,
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: 'rgb(96, 126, 181)',
                    tension: 0.1
                }]
            },
            options: {
                animation: {
                  duration: 0
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    customCanvasBackgroundColor: {}
                }
            },
            plugins: [plugin],
        });
    }

    canvasContext() {
        return this.myChartTarget.getContext('2d');
    }
}
