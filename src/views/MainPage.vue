<script setup lang="ts">
    import { ref } from 'vue';

    import Navbar        from '@/views/navbar/Navbar.vue'
    import SearchParam   from '@/views/search_params/SearchParams.vue'
    import MainPageTable from '@/components/table/MainPageTable.vue';
    import AddTokenDlg   from '@/views/dialog/AddTokenDlg.vue';
    import SignInDlg     from '@/views/dialog/SignInDlg.vue'
    import ProfileDlg     from '@/views/dialog/ProfileDlg.vue';

    import InputText     from '@/components/input/InputText.vue';
    import Button        from 'primevue/button';
    import Dialog        from 'primevue/dialog';

    const isAddTokenDlgOpen = ref(false)
    const isSignInDlgOpen   = ref(false)
    const isProfileDlgOpen  = ref(true)


    const openAddNewTokendDlg = () =>{
        isAddTokenDlgOpen.value = true
    }

    const openSignInDlgOpen = () => {
        isSignInDlgOpen.value = true
    }

    const openProfileDlg = () => {
        isProfileDlgOpen.value = true
    }

</script>

<template>
    <Navbar
        @open-sign-in="openSignInDlgOpen"
    />

    <div class="main_page">
        <InputText />
        <SearchParam/>
        <MainPageTable>
            <Button
                icon="pi pi-plus"
                rounded
                aria-label="Filter"
                @click="openAddNewTokendDlg"/>
        </MainPageTable>

        <Dialog
            v-model:visible="isAddTokenDlgOpen"
            :modal="true"
            :dismissableMask="true"
            header=" "
            :style="{
                width: '90vw',
                maxWidth:'500px' }">

            <AddTokenDlg/>

       </Dialog>

       <Dialog
            v-model:visible="isProfileDlgOpen"
            :modal="true"
            :dismissableMask="true"
            header=" "
            :style="{
                width: '90vw',
                maxWidth:'500px' }">

            <ProfileDlg/>

       </Dialog>

       <Dialog
            v-model:visible="isSignInDlgOpen"
            :draggable="false"
            :modal="true"
            :dismissableMask="true"
            header=" "
            :position="'topright'"
            :style="{
                width: '90vw',
                maxWidth:'500px' }">

            <SignInDlg/>

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