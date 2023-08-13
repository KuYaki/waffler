<script setup lang="ts">
    import { ref } from 'vue';

    import InputText     from '@/components/input/InputText.vue';
    import Navbar        from '@/views/navbar/Navbar.vue'
    import SearchParam   from '@/views/search_params/SearchParams.vue'
    import MainPageTable from '@/components/table/MainPageTable.vue';
    import Button        from 'primevue/button';


</script>

<template>
    <Navbar/>

    <div class="main_page">
        <InputText/>
        <SearchParam/>
        <MainPageTable>
            <Button
                icon="pi pi-plus"
                rounded
                aria-label="Filter" />
        </MainPageTable>
    </div>
</template>

<style scoped>
    .main_page{
        background-color     : pink;
        display              : grid;
        grid-template-columns: 100%;
        align-items          : center;
        margin               : auto;
        max-width            : 600px;
    }

</style>