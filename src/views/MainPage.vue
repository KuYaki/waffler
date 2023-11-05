<script setup lang="ts">
    import { ref, computed, onMounted, type Ref } from 'vue';
    import { storeToRefs } from "pinia";


    import { t }  from '@/util/locale';

    import StoreCreator from '@/store/StoreCreator';
    import APIRoute     from '@/global/api';

    import PlaceholderData from '@/data/component/input'
    import DropdownData    from '@/data/component/dropdown'

    import Navbar        from '@/views/navbar/Navbar.vue'
    import SearchParam   from '@/views/main/search_params/SearchParams.vue'
    import MainPageTable from '@/views/main/MainPageTable.vue'
    import AddTokenDlg   from '@/views/dialog/AddTokenDlg.vue';
    import SignInDlg     from '@/views/dialog/SignInDlg.vue'
    import ProfileDlg    from '@/views/dialog/ProfileDlg.vue';
    import Footer        from '@/views/footer/Footer.vue'

    import InputText     from 'primevue/inputtext';
    import Button        from 'primevue/button';
    import Dialog        from 'primevue/dialog';

    import { TDropdown } from '@/views/main/search_params/types';
    import { createMainTableColumns, Sorted } from '@/model/Tables'

    import type { API } from '@/api/service/interface';
    import type { TOrderKey } from "@/model/MainPage";
    import { DataState } from '@/api/model/interface';
    import { Source, Cursor } from '@/model/MainPage'


    //////////////////////// Vars ///////////////////////////

    const StoreSlotID: API = APIRoute.SOURCE_SEARCH

    const store = StoreCreator.create( StoreSlotID )

    const { model } = storeToRefs( store )

    const isPageMounted = ref(false)


    const isAddTokenDlgOpen = ref(false)
    const isSignInDlgOpen   = ref(false)
    const isProfileDlgOpen  = ref(false)

    const selectedSources   :Ref<TDropdown[]> = ref([])
    const selectedProperties:Ref<TDropdown[]> = ref([DropdownData.property[0]])
    const scoreTypes        :Ref<TDropdown[]> = ref([DropdownData.property[0]])

    const sortedMainTableIdx = ref(2)
    const sortedColumnState  = ref (Sorted.UP)

    const tableRows = ref([])

    const currentSource:Ref<Source> = ref()

    const footer = ref<InstanceType<typeof Footer> | null>(null)


    ////////////////////// Hooks //////////////////////

    onMounted(async () => {
        await updateMainPage()

        isPageMounted.value=true
        console.log( 'STORE ', model.value.data.sources)
    })


    /////////////////////// Computed ///////////////////////

    const columnsMainTable = computed(() => createMainTableColumns(scoreTypes.value, sortedMainTableIdx.value, sortedColumnState.value ))

    const showStateInMainTable = computed(()=> isProfileDlgOpen.value || isAddTokenDlgOpen.value )


    ///////////////////// Function //////////////////////////

    const updateMainPage = async () => {
        model.value.data.cursor = new Cursor()

        store.post(StoreSlotID)
            .then(()=> {
                if( model.value.state == DataState.ERROR) return
                tableRows.value = []
                tableRows.value = tableRows.value.concat(model.value.data.sources)
            })
    }


    ///////////////////// Messages //////////////////////////

    const openAddNewTokendDlg = (isRouteFromMain:boolean , link:string = '') =>{

        model.value.setParseParams(isRouteFromMain)

        if(!isRouteFromMain) model.value.data.parse_url = link

        isAddTokenDlgOpen.value = true
    }

    const openSignInDlgOpen = () => {
        isSignInDlgOpen.value = true
    }

    const openProfileDlg = ( rowIdx:number ) => {
        currentSource.value = tableRows.value[rowIdx]
        isProfileDlgOpen.value = true
    }


    const onUpdateSources = ( curentsValues:TDropdown[] ) => {

        model.value.data.source_type = []

        if ( curentsValues.length > 0 ){

            curentsValues.forEach(el => model.value.data.source_type.push(el.id))

        }else{

            DropdownData.source.forEach(el => model.value.data.source_type.push(el.id))

        }

        if ( isPageMounted.value ) {
            updateMainPage()
        }

        selectedSources.value = curentsValues
    }

    const onUpdateProperties = ( curentsValues:TDropdown[] ) => {
        model.value.data.score_type = []

        if ( curentsValues.length > 0 ){

            scoreTypes.value   = curentsValues
            curentsValues.forEach(el => model.value.data.score_type.push(el.id))

        }else {

            scoreTypes.value = DropdownData.property
            DropdownData.property.forEach(el => model.value.data.score_type.push(el.id))

        }


        if ( isPageMounted.value ) {
            updateMainPage()
        }


        selectedProperties.value = curentsValues
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
        if ( model.value.data.cursor == null ) return

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

    const onParse = () => {
        model.value.data.query = model.value.data.parse_url

        if ( scoreTypes.value.find(el => el.id == model.value.data.parse_score_type) == undefined ){

            scoreTypes.value.push(DropdownData.property.find(el => el.id == model.value.data.parse_score_type))
            selectedProperties.value.push(DropdownData.property.find(el => el.id == model.value.data.parse_score_type))

        }


        isAddTokenDlgOpen.value = false
        isProfileDlgOpen.value = false
        updateMainPage()

    }

    const onOpenPolicyDlg = () => {
        footer.value?.onOpenPolicyDlg()
    }

    const onOpenAuthorDlg = () => {
        footer.value?.onOpenAuthorDlg()
    }

</script>

<template>
    <Navbar
        @open-sign-in="openSignInDlgOpen"
        @open-author="onOpenAuthorDlg"
        @open-policy="onOpenPolicyDlg"
    />

    <div class="main_page">
        <InputText
            :placeholder='t(PlaceholderData.mainSearch)'
            :model-value="model.data.query"
            @update:model-value="onUpdateSearchString"
        />
        <SearchParam
            :sources="DropdownData.source"
            :scores="DropdownData.property"
            :curScores="selectedProperties"
            :curSources="selectedSources"
            @update:curSources="onUpdateSources"
            @update:curScores="onUpdateProperties"
        />
        <MainPageTable
            :columns="columnsMainTable"
            :data="tableRows"
            :state="model.state"
            :show-state="!showStateInMainTable"
            :stop-load="model.data.cursor == null"
            @sorted="onSorted"
            @row-click="openProfileDlg"
            @load-more="loadMoreData"
            @parse-more="openAddNewTokendDlg(true)"
        >

        </MainPageTable>

        <Dialog
            v-model:visible="isAddTokenDlgOpen"
            :modal="true"
            :dismissableMask="true"
            header=" "
            :style="{
                width: '90vw',
                maxWidth:'500px' }">

            <AddTokenDlg
                @parse-completed="onParse"
            />

       </Dialog>

       <Dialog
            v-model:visible="isProfileDlgOpen"
            :modal="true"
            :dismissableMask="true"
            header=" "
            :style="{
                width: '90vw',
                maxWidth:'500px' }">

            <ProfileDlg
                :profile="currentSource"
                @parse-more=" link => openAddNewTokendDlg(false, link)"
            />

       </Dialog>

       <!-- <Dialog
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

       </Dialog> -->
    </div>

    <Footer ref = 'footer' />
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

</style>./main/search_params/types@/model/Tables