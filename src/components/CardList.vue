<template>
    <div>
        <div>
            <!-- Card stats -->
            <div class="flex flex-wrap">
                <div class="w-full lg:w-6/12 xl:w-1/3 px-4">
                    <div class="flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg px-3 py-5">
                        <div class="flex-auto p-4">
                            <div class="flex flex-wrap">
                                <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                                    <h5 class="text-gray-500 uppercase font-bold text-xs">
                                        Donations Total
                                    </h5>
                                    <span class="font-semibold text-xl text-gray-800">{{ data.donations_total }} <span class="text-xs text-teal-500">SDG</span></span>
                                </div>
                                <div class="relative w-auto pl-4 flex-initial">
                                    <div class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500">
                                        <i class="fa fa-gifts"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-full lg:w-6/12 xl:w-1/3 px-4">
                    <div class="flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg px-3 py-5">
                        <div class="flex-auto p-4">
                            <div class="flex flex-wrap">
                                <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                                    <h5 class="text-gray-500 uppercase font-bold text-xs">
                                        Last Donation
                                    </h5>
                                    <span class="font-semibold text-xl text-gray-800">{{ data.last_donation }} <span class="text-xs text-teal-500">SDG</span></span>
                                </div>
                                <div class="relative w-auto pl-4 flex-initial">
                                    <div class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-blue-500">
                                        <i class="fa fa-chart-bar"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-full lg:w-6/12 xl:w-1/3 px-4">
                    <div class="flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg px-3 py-5">
                        <div class="flex-auto p-4">
                            <div class="flex flex-wrap">
                                <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                                    <h5 class="text-gray-500 uppercase font-bold text-xs">
                                        No. of donations today
                                    </h5>
                                    <span class="font-semibold text-xl text-gray-800">{{ data.today_total_donators }} <span class="text-xs text-teal-500">Donator</span></span>
                                </div>
                                <div class="relative w-auto pl-4 flex-initial">
                                    <div class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-orange-500">
                                        <i class="fa fa-users"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                data: {}
            }
        },
        beforeMount() {
            axios.get('http://jodeveloper.com/miaababikir/StandForSudan/public/api/donations')
                .then(response => {
                    console.log(response);
                    this.data = response.data;
                });
            this.refreshData();
        },
        methods: {
            refreshData() {
                let timerID = setInterval(() => {
                    axios.get('http://jodeveloper.com/miaababikir/StandForSudan/public/api/donations')
                        .then(response => {
                            this.data = response.data;
                            console.log('Refreshed!')
                        });
                }, 60 * 1000);
            },
        }
    }
</script>

<style scoped>

</style>