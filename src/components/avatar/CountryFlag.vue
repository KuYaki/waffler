<script setup lang="ts">
    import { onMounted, onUpdated, ref } from 'vue';
    import { RU, GB } from 'country-flag-icons/string/3x2'

    ////////////// Defines //////////////////////////

    const props = defineProps({
        lang: {
            type: String,
            default: "EN"
        }
    })


    /////////////// Hooks ///////////////////////////

    onMounted(() => {
        coutnryFlag.value!.innerHTML = flagList[ props.lang as 'EN' | 'RU' ]
    })

    onUpdated(()=> {
        coutnryFlag.value!.innerHTML = flagList[ props.lang as 'EN' | 'RU']
    })


    /////////////// Vars ////////////////////////////

    let coutnryFlag = ref (null)

    const flagList = {
        'RU': RU,
        'EN': GB
    }


</script>

<template>
    <div class="country_flag_block">
        <div class="country_flag" ref="coutnryFlag">

        </div>
    </div>
</template>

<style>

    .country_flag_block{
        width      : max-content;
        height     : 100%;
        display    : flex;
        align-items: center;
    }

    .country_flag {
        width        : 35px;
        height       : 35px;
        display      : flex;
        align-items  : center;
        overflow     : hidden;
        border-radius: 50%;

    }

</style>