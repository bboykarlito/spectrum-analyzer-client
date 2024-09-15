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
        return new Chart(this.canvasContext(), {
            type: 'line',
            data: {
                labels: chanelValues.map((ch) => `${ch.frequency} MHz`),
                datasets: [{
                    label: 'RSSI',
                    data: chanelValues.map((ch) => ch.rssi),
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    canvasContext() {
        return this.myChartTarget.getContext('2d');
    }
}
