import { Controller } from "@hotwired/stimulus"

import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default class extends Controller {
    static targets = ['myChart'];
    static values = { chanels: Array };

    canvasContext() {
        return this.myChartTarget.getContext('2d');
    }

    connect() {
        let chanelValues = this.chanelsValue;
        chanelValues.map((ch) =>
            console.log(ch.rssi)
        )
        new Chart(this.canvasContext(), {
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
}