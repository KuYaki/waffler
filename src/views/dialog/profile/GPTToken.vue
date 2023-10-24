<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { t }              from '@/util/locale';

    import InputText     from 'primevue/inputtext';
    import Checkbox      from 'primevue/checkbox';


    ///////////////// Defines ///////////////////

    const props = defineProps({
        value: {
            type: String,
            default: 'John Doe'
        }
    })

    const emit = defineEmits<{
        (e: 'update:value', value:string): void,
    }>();


    ////////////// Vars ////////////////////////

    let isSaveToken = ref(true)


    ///////////// Hooks ////////////////////////

    onMounted(()=>{

        if( localStorage['GPTToken'] != undefined ){
            const token = localStorage['GPTToken']
            emit('update:value', token)
        }

        if( localStorage['isSaveToken'] != undefined ){
            const savingModeState = JSON.parse(localStorage['isSaveToken'])
            isSaveToken.value = savingModeState
        }
    })


    ////////////// Messages ////////////////////

    const onInput = ( val:string ) => {
        localStorage.removeItem('GPTToken')

        if( isSaveToken.value ){
            localStorage.setItem('GPTToken', val )
        }

        emit( 'update:value', val )
    }

    const onChange = ( ) => {

        if( isSaveToken.value ){
            localStorage.setItem('GPTToken', props.value )
        }
        else{
            localStorage.removeItem('GPTToken')
        }

        localStorage.setItem('isSaveToken', JSON.stringify(isSaveToken.value) )
    }

</script>

<template>

<div class="gpt_block">
    <InputText
        :placeholder="t('add_token_page.token')"
        :modelValue="value"
        @input="onInput(($event.target as HTMLInputElement).value)"
    />
    <Checkbox
        v-tooltip.left="t('add_token_page.save_tooltip')"
        :binary="true"
        v-model="isSaveToken"
        @change="onChange"
    />
</div>


</template>

<style scoped>
    .gpt_block{
        display              : grid;
        align-items          : center;
        grid-template-columns: 9fr 1fr;
        column-gap           : 15px;
        width                : 100%;
    }

</style>