<script setup lang="ts">
    import { ref } from 'vue';

    import InputText     from '@/components/input/InputText.vue';
    import Navbar        from '@/views/navbar/Navbar.vue'
    import SearchParam   from '@/views/search_params/SearchParams.vue'
    import MainPageTable from '@/components/table/MainPageTable.vue';
    import AddTokenDlg   from '@/views/dialog/AddTokenDlg.vue';
    import Button        from 'primevue/button';
    import Dialog        from 'primevue/dialog';

    const visible = ref(false)

    const openAddNewTokendDlg = () =>{
        visible.value = true
    }
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
                aria-label="Filter"
                @click="openAddNewTokendDlg"/>
        </MainPageTable>

        <Dialog
            v-model:visible="visible"
            modal
            header=" "
            :style="{ width: '90vw', maxWidth:'500px' }">

            <AddTokenDlg/>

       </Dialog>
    </div>
</template>

<style scoped>
    .main_page{
        /* background-color     : pink; */
        display              : grid;
        grid-template-columns: 100%;
        align-items          : center;
        margin               : auto;
        max-width            : 600px;
    }

</style>