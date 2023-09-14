<script setup lang="ts">
    import { ref, computed, onMounted, type Ref } from 'vue';
    import { storeToRefs } from "pinia";


    import { t }  from '@/util/locale';

    import StoreCreator from '@/store/StoreCreator';
    import APIRoute from '@/global/api';

    import PlaceholderData from '@/data/component/input'

    import Navbar        from '@/views/navbar/Navbar.vue'
    import SearchParam   from '@/views/search_params/SearchParams.vue'
    import MainPageTable from '@/components/table/MainPageTable.vue';
    import AddTokenDlg   from '@/views/dialog/AddTokenDlg.vue';
    import SignInDlg     from '@/views/dialog/SignInDlg.vue'
    import ProfileDlg     from '@/views/dialog/ProfileDlg.vue';

    // import InputText     from '@/components/input/InputText.vue';
    import InputText     from 'primevue/inputtext';
    import Button        from 'primevue/button';
    import Dialog        from 'primevue/dialog';

    import { TDropdown } from './search_params/types';
    import { createMainTableColumns } from '@/model/MainTable'

    import type { API } from '@/api/service/interface';


    //////////////////////// Vars ///////////////////////////

    const StoreSlotID: API = APIRoute.SOURCE_SEARCH


    const store = StoreCreator.create( APIRoute.SOURCE_SEARCH )

    const { model } = storeToRefs( store )


    const isAddTokenDlgOpen = ref(false)
    const isSignInDlgOpen   = ref(false)
    const isProfileDlgOpen  = ref(false)

    const properties: Ref<TDropdown[]> = ref([])
    const propertyList: Ref<TDropdown[]> = ref([])

    const sources   : Ref<TDropdown[]> = ref()
    const sourceList: Ref<TDropdown[]> = ref()

    const sortedMainTableIdx = ref(0)


    ////////////////////// Hooks //////////////////////

    onMounted(async () => {
      store.post(StoreSlotID);

      console.log( 'STORE ', model.value.data.sources)
    })


    ///////////////////// Function /////////////////////////


    /////////////////////// Computed ///////////////////////

    const columnsMainTable = computed(() => createMainTableColumns(properties.value, propertyList.value, sortedMainTableIdx.value  ))


    ///////////////////// Messages //////////////////////////

    const openAddNewTokendDlg = () =>{
        isAddTokenDlgOpen.value = true
    }

    const openSignInDlgOpen = () => {
        isSignInDlgOpen.value = true
    }

    const openProfileDlg = () => {
        isProfileDlgOpen.value = true
    }


    const onUpdateSources = ( curentsValues:TDropdown[], list:TDropdown[] ) => {

        sources.value    = curentsValues
        sourceList.value = list
    }

    const onUpdateProperties = ( curentsValues:TDropdown[], list:TDropdown[] ) => {
        sortedMainTableIdx.value = 2
        properties.value   = curentsValues
        propertyList.value = list
    }

    const onSorted = ( idx:number ) => {
        sortedMainTableIdx.value = idx
    }

</script>

<template>
    <Navbar
        @open-sign-in="openSignInDlgOpen"
    />

    <div class="main_page">
        <InputText
            :placeholder='t(PlaceholderData.mainSearch)'
        />
        <SearchParam
            @change-source="onUpdateSources"
            @change-properties="onUpdateProperties"
        />
        <MainPageTable
            :columns="columnsMainTable"
            @sorted="onSorted"
            @open-profile="openProfileDlg"
        >
            <Button
                icon="pi pi-plus"
                rounded
                aria-label="Filter"
                @click="openAddNewTokendDlg" />

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