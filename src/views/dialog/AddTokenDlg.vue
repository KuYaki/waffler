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
    })


    ////////////////// Computed ////////////////////

    const isDisabledParse = computed( () => model.value.data.parse_url.length == 0 || model.value.data.parser!.token.length == 0 )


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

</script>

<template>
    <div class="token">
        <span>{{ t('add_token_page.info') }}</span>
        <InputText
            :placeholder="t('add_token_page.link')"
            v-model:modelValue="model.data.parse_url"
        />
        <SourceProfile
            :source-type="model.data.parse_source_type"
        />
        <Dropdown
            v-model="currentField"
            display="chip"
            :options="DropdownData.property"
            @update:modelValue="onChangeScore"
            optionLabel="label"/>
        <InputText
            :placeholder="t('add_token_page.token')"
            v-model:modelValue="model.data.parser!.token"
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

</style>