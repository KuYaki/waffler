<script setup lang="ts">
    import { ref } from "vue";

    import Dropdown from "primevue/dropdown";

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
        <Dropdown
            v-model="selectedCities"
            display="chip"
            :options="cities"
            optionLabel="name"
            placeholder="Select Cities"/>
            {{ selectedCities }}
</template>


<style>

</style>