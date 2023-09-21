<script setup lang="ts">
    import { ref, PropType, onMounted, computed, Ref } from 'vue';
    import { storeToRefs } from "pinia";


    import { t } from '@/util/locale';

    import { Source } from '@/model/MainPage';
    import { createProfileTableColumn, Sorted } from '@/model/MainTable';

    import DropdownData from '@/data/component/dropdown'
    import StoreCreator from '@/store/StoreCreator';
    import APIRoute     from '@/global/api';

    import Profile      from '@/components/avatar/Profile.vue'
    import Dropdown     from 'primevue/dropdown';
    import Button       from 'primevue/button';
    import ProfileTable from '@/components/table/ProfileTable.vue';
    import SourceProfile from '@/components/avatar/SourceProfile.vue';


    import { Records }  from '@/model/MainPage';
    import { DataState } from '@/api/model/interface';

    import type { TScoreOrderKey } from "@/model/MainPage";
    import type { API } from '@/api/service/interface';


    /////////////// Defines //////////////////////

    const props = defineProps({
        profile :{
            type: Object as PropType<Source>,
            default:{}
        }
    })

    const emit = defineEmits<{
        (e:'parseMore'):void
    }>();


    ////////////////// Vars //////////////////////////

    const StoreSlotID: API = APIRoute.SOURCE_SEARCH

    const store = StoreCreator.create( StoreSlotID )

    const { model } = storeToRefs( store )

    const currentScore = ref( DropdownData.property[0]);

    const sortedMainTableIdx = ref(1)
    const sortedColumnState  = ref (Sorted.DOWN)

    const tableRows:Ref<Array<Records>> = ref()

    ////////////////// Hooks ///////////////////////

    onMounted(()=> {
        model.value.setScoreParams()

        model.value.data.score_source_id = props.profile.id

        currentScore.value = DropdownData.property.find(el => el.id == model.value.data.score_score_type)

        updateProfileTable()
    })

    //////////////// Function ////////////////////////

    const updateProfileTable = async ( ) => {
        model.value.data.score_cursor = 0

        store.post(APIRoute.SOURCE_SCORE)
            .then(()=> {
                if( model.value.state == DataState.ERROR) return
                tableRows.value = []
                tableRows.value = tableRows.value.concat(model.value.data.records)
            })
    }


    //////////////// Computed ////////////////////////

    const columnProfileTable = computed(()=> createProfileTableColumn(sortedMainTableIdx.value, sortedColumnState.value))


    /////////////// Messages ///////////////////////

    const loadMoreData = () => {
        store.post(APIRoute.SOURCE_SCORE)
            .then(()=> {
                if( model.value.state == DataState.ERROR) return

                tableRows.value = tableRows.value.concat(model.value.data.records)
            })
    }

    const onSorted = ( idx:number ) => {
        const curSortedState = columnProfileTable.value[ idx ].sorted
        sortedMainTableIdx.value = idx

        if ( curSortedState == Sorted.NULL || curSortedState == Sorted.UP ){
            sortedColumnState.value = Sorted.DOWN
        }
        else {
            sortedColumnState.value = Sorted.UP
        }

        model.value.data.score_order = columnProfileTable.value[ idx ].sortedKey as TScoreOrderKey
        updateProfileTable()
    }

    const onChangeScore = () =>{
        model.value.data.score_score_type = currentScore.value.id

        updateProfileTable()
    }

    const onParseMore = () => {

        emit('parseMore')

    }

    const onOpenLink = () =>{

        window.open( props.profile.source_url , '_blank' );
    }

</script>

<template>
    <div class="profile_block">
        <div class="head">

            <SourceProfile
                :label       = "profile.name"
                :source-type = "profile.source_type"
                @click="onOpenLink"/>

            <Dropdown
                v-model="currentScore"
                display="chip"
                :options="DropdownData.property"
                optionLabel="label"
                @change="onChangeScore"/>

        </div>

        <ProfileTable
            :columns = "columnProfileTable"
            :state   = "model.state"
            :data    = "tableRows"
            @loadMore="loadMoreData"
            @sorted="onSorted"
        />

        <Button
            :label="t('profile_page.parse')"
            @click="onParseMore"
            outlined />
    </div>
</template>


<style scoped>
    .profile_block {
        display: grid;
        grid-template-columns: 100%;
        row-gap: 10px;
    }

    .head {
        display: grid;
        grid-template-columns: 50% 50%;
        align-items: center;
    }

</style>