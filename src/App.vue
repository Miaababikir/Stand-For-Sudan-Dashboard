<template>
    <div id="app" dir="rtl">
        <div class="bg-gray-200 font-tajawal">

            <!-- Header -->
            <header-component/>

            <div class="px-4 py-20 md:px-10 mx-auto w-full">
                <card-list/>
                <div class="flex flex-wrap mt-20">
                    <line-chart-component></line-chart-component>
                </div>
            </div>
            <footer class="bg-white">
                <div class="px-8 py-6 text-gray-800 text-center">
                    <p>Built with <span class="text-red-600">❤️</span> By @<a class="text-blue-600" href="https://www.facebook.com/OmegaTeamSD">Omega</a> and @<a class="text-blue-600" href="https://twitter.com/obayhamid">Obiefy</a></p>
                </div>
            </footer>
        </div>
    </div>
</template>

<script>

    import LineChartComponent from "./components/LineChart";
    import HeaderComponent from "./components/Header";
    import CardList from "./components/CardList";

    export default {
        name: 'App',
        components: {HeaderComponent, CardList, LineChartComponent},
        mounted() {
            this.$ga.page('/');
        }
    }
</script>

<style lang="scss" src="./scss/app.scss"></style>
