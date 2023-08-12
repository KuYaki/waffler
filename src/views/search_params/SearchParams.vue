<script setup lang="ts">
    import { ref } from 'vue';

    import MultiSelect from "primevue/multiselect";

    const selectedCities = ref();
    const cities = ref([
        { name: 'New York', code: 'NY' },
        { name: 'Rome',     code: 'RM' },
        { name: 'London',   code: 'LDN'},
        { name: 'Istanbul', code: 'IST'},
        { name: 'Paris',    code: 'PRS'}
    ]);

</script>

<template>
    <div class="params">

        <MultiSelect
            v-model="selectedCities"
            display="chip"
            :options="cities"
            optionLabel="name"
            placeholder="Select Cities"
            :maxSelectedLabels="2" />

        <MultiSelect
            v-model="selectedCities"
            display="chip"
            :options="cities"
            optionLabel="name"
            placeholder="Select Cities"
            :maxSelectedLabels="2" />

    </div>
</template>

<style scoped>


    .params{
        width                : 100%;
        display              : grid;
        grid-template-columns: 49.5% 49.5%;
        column-gap           : 1%;
        box-sizing           : border-box;
        padding              : 10px 0;
    }

    @media (max-width: 500px) {
        .params{
            grid-template-columns: 100%;
            row-gap              : 10px;
        }
    }



</style>