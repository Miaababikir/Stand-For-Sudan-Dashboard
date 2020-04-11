<template>
    <div>
        <div class="bg-cover bg-left-bottom sm:bg-center bg-fixed" :style="{ backgroundImage: 'url(' + require('@/assets/cover.jpg') + ')' }">
            <div class="pb-20 pt-20 md:p-32" style="background: rgba(26, 32, 44, 0.7)">
                <div class="px-4 text-white text-center">
                    <img :src="require('@/assets/logo.png')" class="mx-auto h-20"/>
                    <h1 class="text-5xl md:text-6xl uppercase mt-2">القومة للسودان</h1>
                    <p class="mb-6 text-base md:text-xl">" عقبال الخير يترادم... والدنيا تمش دغرية<span class="text-red-600"> ❤️ </span>"</p>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    export default {

    }
</script>

<style scoped>

</style>