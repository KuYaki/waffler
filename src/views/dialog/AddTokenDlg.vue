<script setup lang="ts">
    import { ref, onMounted, computed } from 'vue';
    import { storeToRefs } from "pinia";

    import StoreCreator   from '@/store/StoreCreator';
    import APIRoute       from '@/global/api';
    import DropdownData  from '@/data/component/dropdown'

    import { t } from '@/util/locale';
    import { isURL } from '@/helper/CheckUrl';

    import InputText     from 'primevue/inputtext';
    import Dropdown      from 'primevue/dropdown';
    import Button        from 'primevue/button';
    import SourceProfile from '@/components/avatar/SourceProfile.vue';
    import GPTToken      from '@/views/dialog/add_token/GPTToken.vue';


    import type { API } from '@/api/service/interface';
    import { DataState }     from "@/api/model/interface";
    import { TokenType } from '@/model/MainPage'

    /////////////////////Defines /////////////////////////////

    const emit = defineEmits<{
        (e: 'parseCompleted'): void,
    }>();


    ///////////////////// Vars ///////////////////////////////

    const StoreSlotID: API = APIRoute.SOURCE_SEARCH

    const store = StoreCreator.create( StoreSlotID )

    const { model } = storeToRefs( store )

    const currentField = ref( );
    const tokenType = ref()


    ////////////////// Hooks ///////////////////////

    onMounted(()=> {
        currentField.value = DropdownData.property.find(el => el.id == model.value.data.parse_score_type)
    
        if ( window.localStorage.getItem('token_type') == null) {
            tokenType.value = DropdownData.tokens.find(el => el.id == model.value.data.parse_token_type )
        }
        else{
            tokenType.value = DropdownData.tokens.find(el => el.id ==  JSON.parse(window.localStorage.getItem('token_type')) )
            model.value.data.parse_token_type = tokenType.value.id
        }

        onGetInfo()
    })


    ////////////////// Computed ////////////////////

    const isDisabledParse = computed( () => model.value.data.parse_url.length == 0 || model.value.data.parser!.token.length == 0 )

    const showAddTokeMsg = computed(()=> model.value.data.name.length > 0)

    const isShowGPTToken = computed (()=> model.value.data.parse_token_type == TokenType.ChatGPT )


    ///////////////// Messages /////////////////////

    const load = () =>{
        store.post( APIRoute.SOURCE_PARSE )
            .then(()=>{
                if( model.value.state == DataState.ERROR) return

                emit('parseCompleted')
            })
    }

    const onChangeScore = ( value:any ) => {
        model.value.data.parse_score_type = value.id
    }

    const onChangeTokenType = ( value:any ) =>{
        model.value.data.parse_token_type = value.id
        window.localStorage.setItem('token_type', value.id)
    }

    const onGetInfo = () => {
        model.value.data.name = ''

        if( isURL( model.value.data.parse_url ) ){
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
        <Dropdown
            v-model="tokenType"
            display="chip"
            :options="DropdownData.tokens"
            @update:modelValue="onChangeTokenType"
            optionLabel="label"
        />
        <GPTToken
            v-if="isShowGPTToken"
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