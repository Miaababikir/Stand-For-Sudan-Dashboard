<template>
    <div id="app">
        <div class="bg-gray-200 font-roboto">

            <!-- Header -->
            <header-component/>

            <div class="px-4 py-20 md:px-10 mx-auto w-full">
                <card-list :data="data"/>
                <div class="flex flex-wrap mt-20">
                    <line-chart-component></line-chart-component>
                </div>
            </div>
            <footer class="bg-white">
                <div class="px-8 py-6 text-gray-800 text-center">
                    <p>Built with <span class="text-red-600">❤️</span> By @<a class="text-blue-600"
                                                                              href="https://twitter.com/miaababikir">Miaababikir</a>
                    </p>
                </div>
            </footer>
        </div>
    </div>
</template>

<script>

    import axios from 'axios';

    import LineChartComponent from "./components/LineChart";
    import HeaderComponent from "./components/Header";
    import CardList from "./components/CardList";

    export default {
        name: 'App',
        components: {HeaderComponent, CardList, LineChartComponent},
        data() {
            return {
                data: {},
            }
        },
        beforeMount() {
            axios.get('http://127.0.0.1:8000/api/donations')
                .then(response => {
                    console.log(response);
                    this.data = response.data;
                });
        }
    }
</script>

<style lang="scss" src="./scss/app.scss"></style>
