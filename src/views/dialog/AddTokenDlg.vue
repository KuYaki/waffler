<script setup lang="ts">
    import { ref, onMounted, computed } from 'vue';
    import { storeToRefs } from "pinia";

    import StoreCreator   from '@/store/StoreCreator';
    import APIRoute       from '@/global/api';
    import DropdownData  from '@/data/component/dropdown'

    import { t } from '@/util/locale';

    // import InputText from '@/components/input/InputText.vue';
    import InputText     from 'primevue/inputtext';
    import Dropdown      from 'primevue/dropdown';
    import Button        from 'primevue/button';
    import SourceProfile from '@/components/avatar/SourceProfile.vue';
    import GPTToken from './profile/GPTToken.vue';


    import type { API } from '@/api/service/interface';
    import { DataState }     from "@/api/model/interface";


    /////////////////////Defines /////////////////////////////

    const emit = defineEmits<{
        (e: 'parseCompleted'): void,
    }>();


    ///////////////////// Vars ///////////////////////////////

    const StoreSlotID: API = APIRoute.SOURCE_SEARCH

    const store = StoreCreator.create( StoreSlotID )

    const { model } = storeToRefs( store )

    const currentField = ref( );


    ////////////////// Hooks ///////////////////////

    onMounted(()=> {
        currentField.value = DropdownData.property.find(el => el.id == model.value.data.parse_score_type)
        onGetInfo()
    })


    ////////////////// Computed ////////////////////

    const isDisabledParse = computed( () => model.value.data.parse_url.length == 0 || model.value.data.parser!.token.length == 0 )

    const showAddTokeMsg = computed(()=> model.value.data.name.length > 0)


    ///////////////// Messages /////////////////////

    const load = () =>{
        store.post(APIRoute.SOURCE_PARSE)
            .then(()=>{
                if( model.value.state == DataState.ERROR) return

                emit('parseCompleted')
            })
    }

    const onChangeScore = () => {
        model.value.data.parse_score_type = currentField.value.id
    }

    const onGetInfo = () => {
        model.value.data.name = ''

        if( model.value.isURL( model.value.data.parse_url ) ){
            store.post(APIRoute.SOURCE_INFO)
        }
    }

</script>

<template>
    <div class="token">
        <span>{{ t('add_token_page.info') }}</span>
        <InputText
            :placeholder="t('add_token_page.link')"
            v-model:modelValue="model.data.parse_url"
            @update:model-value="onGetInfo"
        />
        <SourceProfile
            v-if="showAddTokeMsg"
            :source-type="model.data.type"
            :label="model.data.name"
        />
        <div v-else class="source_profile_block">
            {{ t('add_token_page.need_link') }}
        </div>
        <Dropdown
            v-model="currentField"
            display="chip"
            :options="DropdownData.property"
            @update:modelValue="onChangeScore"
            optionLabel="label"
        />
        <GPTToken
            v-model:value="model.data.parser!.token"
        />
        <Button
            :label="t('add_token_page.parse')"
            :loading="model.state == DataState.LOADING"
            @click="load"
            :disabled="isDisabledParse"
            outlined />
    </div>
</template>


<style scoped>
    .token{
        display: grid;
        grid-template-columns: 100%;
        row-gap: 10px;
    }

    .source_profile_block{
        display    : flex;
        align-items: center;
        font-weight: 700;
        font-size  : 20px;
        cursor     : pointer;
        min-width  : min-content;
    }

</style>