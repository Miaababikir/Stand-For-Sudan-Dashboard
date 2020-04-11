<template>
    <div>
        <div>
            <!-- Card stats -->
            <div class="flex flex-wrap">
                <div class="w-full lg:w-1/2 xl:w-1/2 px-4">
                    <div class="flex flex-col items-center min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg px-3 py-5">
                        <div class="p-4">
                            <div class="flex flex-col items-center w-full pr-4 max-w-full">
                                <div class="w-auto">
                                    <div class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500">
                                        <i class="fa fa-gifts"></i>
                                    </div>
                                </div>
                                <h5 class="text-gray-700 uppercase font-bold text-2xl mt-5">
                                    مجموع التبرعات
                                </h5>
                                <span class="font-semibold text-xl text-gray-700">{{ data.donations_total | moneyFormat | toArabic }} <span
                                        class="text-xs text-teal-500">جنيه</span></span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="w-full lg:w-1/2 xl:w-1/2 px-4">
                    <div class="flex flex-col items-center min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg px-3 py-5">
                        <div class="p-4">
                            <div class="flex flex-col items-center w-full pr-4 max-w-full">
                                <div class="w-auto">
                                    <div class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-blue-500">
                                        <i class="fa fa-users"></i>
                                    </div>
                                </div>
                                <h5 class="text-gray-700 uppercase font-bold text-2xl mt-5">
                                    مجموع المتبرعين
                                </h5>
                                <span class="font-semibold text-xl text-gray-700">{{ data.total_donators.toString() | toArabic }} <span
                                        class="text-xs text-teal-500">زول</span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-20">
            <div class="text-center">
                <h2 class="text-3xl text-gray-700">آخر التبرعات</h2>
            </div>
            <carousel class="max-w-6xl px-4 py-4 mx-auto mt-4" dir="ltr" :perPage="1" :perPageCustom="[[340, 2], [1024, 3]]" paginationActiveColor="#2d3748" paginationColor="#cbd5e0">
                <slide class="h-32" dir="rtl" v-for="donation in data.donations">
                    <div class="flex flex-col justify-center px-4 py-4 bg-white shadow-lg rounded mx-2">
                        <div>
                            <p class=" font-semibold text-center text-gray-700 text-lg md:text-3xl">{{ donation.donation | moneyFormat | toArabic}}<span
                                    class="text-xs text-teal-500"> جنيه</span></p>
                            <p class="text-sm md:text-lg text-center text-gray-500">{{ donation.created_at}}</p>
                        </div>
                    </div>
                </slide>
            </carousel>
        </div>
    </div>
</template>

<script>

    import axios from 'axios';
    import {Carousel, Slide} from 'vue-carousel';

    export default {
        components: {
            Carousel,
            Slide
        },
        data() {
            return {
                data: {
                    donations: [],
                    donations_total: 0,
                    total_donators: '0'
                }
            }
        },
        beforeMount() {
            axios.get('https://sfs-api.obay-dev.com/api/donations')
                .then(response => {
                    this.data = response.data;
                });
            this.refreshData();
        },
        filters: {
            moneyFormat(value) {
                return new Intl.NumberFormat().format(value);
            },
            toArabic(value) {
                let numbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

                return value.replace(/[0-9]/g, (w) => {
                    return numbers[+w]
                });
            }
        },
        methods: {
            refreshData() {
                let timerID = setInterval(() => {
                    axios.get('https://sfs-api.obay-dev.com/api/donations')
                        .then(response => {
                            this.data = response.data;
                        });
                }, 60 * 1000);
            },
        }
    }
</script>