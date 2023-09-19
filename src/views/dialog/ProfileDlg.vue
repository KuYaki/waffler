<script setup lang="ts">
    import { ref, PropType, onMounted } from 'vue';
    import { storeToRefs } from "pinia";


    import { t } from '@/util/locale';

    import { Source } from '@/model/MainPage';

    import DropdownData from '@/data/component/dropdown'
    import StoreCreator from '@/store/StoreCreator';
    import APIRoute     from '@/global/api';

    import Profile      from '@/components/avatar/Profile.vue'
    import Dropdown     from 'primevue/dropdown';
    import Button       from 'primevue/button';
    import ProfileTable from '@/components/table/ProfileTable.vue';

    import type { API } from '@/api/service/interface';



    /////////////// Defines //////////////////////

    const props = defineProps({
        profile :{
            type: Object as PropType<Source>,
            default:{}
        }
    })

    const emit = defineEmits<{
    }>();


    ////////////////// Vars //////////////////////////

    const StoreSlotID: API = APIRoute.SOURCE_SEARCH

    const store = StoreCreator.create( StoreSlotID )

    const { model } = storeToRefs( store )

    const currentField = ref( DropdownData.property[0]);

    ////////////////// Hooks ///////////////////////

    onMounted(()=> {
        model.value.setScoreParams()

        model.value.data.score_source_id = props.profile.id

        currentField.value = DropdownData.property.find(el => el.id == model.value.data.score_score_type)

        store.post(APIRoute.SOURCE_SCORE)
    })

</script>

<template>
    <div class="profile_block">
        <div class="head">

            <Profile :username="profile.name" />

            <Dropdown
                v-model="currentField"
                display="chip"
                :options="DropdownData.property"
                optionLabel="label"/>

        </div>

        <!-- <ProfileTable /> -->

        <Button
            :label="t('profile_page.parse')"
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