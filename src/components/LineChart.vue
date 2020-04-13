<template>
    <div class="w-full md:w-3/4 mx-auto mb-12 xl:mb-0 px-4">
        <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-gray-900">
            <div class="rounded-t mb-0 px-4 py-3 bg-transparent">
                <div class="flex flex-wrap items-center">
                    <div class="relative w-full max-w-full flex-grow flex-1">
                        <h2 class="text-white text-xl font-semibold">
                            آخر التبرعات
                        </h2>
                    </div>
                </div>
            </div>
            <div class="p-4 flex-auto">
                <!-- Chart -->
                <div class="relative" style="height:350px">
                    <canvas id="line-chart"></canvas>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Chart from "chart.js";
    import axios from "axios";

    export default {
        data() {
            return {
                data: [],
                chart: {},
                config: {
                    type: "line",
                    data: {},
                    options: {
                        maintainAspectRatio: false,
                        responsive: true,
                        title: {
                            display: false,
                            text: "Donations",
                            fontColor: "white",
                        },
                        legend: {
                            labels: {
                                fontColor: "white"
                            },
                            align: "end",
                            position: "bottom"
                        },
                        tooltips: {
                            mode: "index",
                            intersect: false
                        },
                        hover: {
                            mode: "nearest",
                            intersect: true
                        },
                        scales: {
                            xAxes: [
                                {
                                    ticks: {
                                        fontColor: "rgba(255,255,255,.7)"
                                    },
                                    display: true,
                                    scaleLabel: {
                                        display: false,
                                        labelString: "Month",
                                        fontColor: "white"
                                    },
                                    gridLines: {
                                        display: false,
                                        borderDash: [2],
                                        borderDashOffset: [2],
                                        color: "rgba(33, 37, 41, 0.3)",
                                        zeroLineColor: "rgba(0, 0, 0, 0)",
                                        zeroLineBorderDash: [2],
                                        zeroLineBorderDashOffset: [2]
                                    }
                                }
                            ],
                            yAxes: [
                                {
                                    ticks: {
                                        fontColor: "rgba(255,255,255,.7)"
                                    },
                                    display: true,
                                    scaleLabel: {
                                        display: false,
                                        labelString: "Value",
                                        fontColor: "white"
                                    },
                                    gridLines: {
                                        borderDash: [3],
                                        borderDashOffset: [3],
                                        drawBorder: false,
                                        color: "rgba(255, 255, 255, 0.15)",
                                        zeroLineColor: "rgba(33, 37, 41, 0)",
                                        zeroLineBorderDash: [2],
                                        zeroLineBorderDashOffset: [2]
                                    }
                                }
                            ]
                        }
                    }
                },
            }
        },
        beforeMount() {
            axios.get('https://sfs-api.obay-dev.com/api/donations')
                .then(response => {

                    this.data = response.data;

                    this.$nextTick(() => {
                        this.config.data = {
                            labels: this.dates.reverse(),
                            datasets: [
                                {
                                    label: new Date().getFullYear(),
                                    backgroundColor: "#4fd1c5",
                                    borderColor: "#4fd1c5",
                                    data: this.totals.reverse(),
                                    fill: false
                                },
                            ]
                        };

                        let ctx = document.getElementById("line-chart").getContext("2d");

                        this.chart = new Chart(ctx, this.config);
                    });
                });

            this.refreshData();
        },
        computed: {
            totals() {
                return this.data.donations.map(donation => donation.total_amount);
            },
            dates() {
                return this.data.donations.map(donation => donation.created_at);
            }
        },
        methods: {
            refreshData() {
                let timerID = setInterval(() => {
                    axios.get('https://sfs-api.obay-dev.com/api/donations')
                        .then(response => {
                            this.data = response.data;
                            this.resetChart();
                        });
                }, 60 * 1000);
            },
            resetChart() {
                this.config.data = {
                    labels: this.dates.reverse(),
                    datasets: [
                        {
                            label: new Date().getFullYear(),
                            backgroundColor: "#4fd1c5",
                            borderColor: "#4fd1c5",
                            data: this.totals.reverse(),
                            fill: false
                        },
                    ]
                };

                this.chart.data.labels = this.config.data.labels;
                this.chart.data.datasets = this.config.data.datasets;
                this.chart.update();
            }
        }
    };
</script>
