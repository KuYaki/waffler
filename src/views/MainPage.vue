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

    import InputText     from 'primevue/inputtext';
    import Button        from 'primevue/button';
    import Dialog        from 'primevue/dialog';

    import { TDropdown } from './search_params/types';
    import { createMainTableColumns, Sorted } from '@/model/MainTable'

    import type { API } from '@/api/service/interface';
    import type { TOrderKey } from "@/model/MainPage";
    import { DataState } from '@/api/model/interface';


    //////////////////////// Vars ///////////////////////////

    const StoreSlotID: API = APIRoute.SOURCE_SEARCH

    const store = StoreCreator.create( StoreSlotID )

    const { model } = storeToRefs( store )

    const isPageMounted = ref(false)


    const isAddTokenDlgOpen = ref(false)
    const isSignInDlgOpen   = ref(false)
    const isProfileDlgOpen  = ref(false)

    const scoreTypes: Ref<TDropdown[]> = ref([])

    const sources   : Ref<TDropdown[]> = ref()
    const sourceList: Ref<TDropdown[]> = ref()

    const sortedMainTableIdx = ref(0)
    const sortedColumnState  = ref (Sorted.DOWN)

    const tableRows = ref([])



    ////////////////////// Hooks //////////////////////

    onMounted(async () => {
        await updateMainPage()

        isPageMounted.value=true
        console.log( 'STORE ', model.value.data.sources)
    })


    ///////////////////// Function /////////////////////////


    /////////////////////// Computed ///////////////////////

    const columnsMainTable = computed(() => createMainTableColumns(scoreTypes.value, sortedMainTableIdx.value, sortedColumnState.value ))


    ///////////////////// Function //////////////////////////

    const updateMainPage = async () => {
        model.value.data.cursor = 0

        store.post(StoreSlotID)
            .then(()=> {
                tableRows.value = []
                if( model.value.state == DataState.ERROR) return
                tableRows.value = tableRows.value.concat(model.value.data.sources)
            })
    }


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
        model.value.data.source_type = []

        if ( curentsValues.length > 0 ){

            curentsValues.forEach(el => model.value.data.source_type.push(el.id))

        }else{

            list.forEach(el => model.value.data.source_type.push(el.id))

        }

        if ( isPageMounted.value ) {
            updateMainPage()
        }

        sources.value    = curentsValues
        sourceList.value = list
    }

    const onUpdateProperties = ( curentsValues:TDropdown[], list:TDropdown[] ) => {
        model.value.data.score_type = []

        if ( curentsValues.length > 0 ){

            scoreTypes.value   = curentsValues
            curentsValues.forEach(el => model.value.data.score_type.push(el.id))

        }else {

            scoreTypes.value = list
            list.forEach(el => model.value.data.score_type.push(el.id))

        }


        if ( isPageMounted.value ) {
            updateMainPage()
        }

        sortedMainTableIdx.value = 2

    }

    const onSorted = ( idx:number ) => {
        const curSortedState = columnsMainTable.value[ idx ].sorted
        sortedMainTableIdx.value = idx

        if ( curSortedState == Sorted.NULL || curSortedState == Sorted.UP ){
            sortedColumnState.value = Sorted.DOWN
        }
        else {
            sortedColumnState.value = Sorted.UP
        }

        model.value.data.order = columnsMainTable.value[ idx ].sortedKey as TOrderKey
        updateMainPage()

    }

    const loadMoreData = () => {
        store.post(StoreSlotID)
            .then(()=> {
                if( model.value.state == DataState.ERROR) return
                tableRows.value = tableRows.value.concat(model.value.data.sources)
            })
    }

    const onUpdateSearchString = (value:string) => {
        model.value.data.query = value
        updateMainPage()
    }

</script>

<template>
    <Navbar
        @open-sign-in="openSignInDlgOpen"
    />

    <div class="main_page">
        <InputText
            :placeholder='t(PlaceholderData.mainSearch)'
            :model-value="model.data.query"
            @update:model-value="onUpdateSearchString"
        />
        <SearchParam
            @change-source="onUpdateSources"
            @change-properties="onUpdateProperties"
        />
        <MainPageTable
            :columns="columnsMainTable"
            :data="tableRows"
            :state="model.state"
            @sorted="onSorted"
            @open-profile="openProfileDlg"
            @load-more="loadMoreData"
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