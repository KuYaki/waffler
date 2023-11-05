<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { t }              from '@/util/locale';
    import URL                from '@/global/urls';

    import InputText     from 'primevue/inputtext';
    import Checkbox      from 'primevue/checkbox';
    import Button        from 'primevue/button';


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

    const onOpenLink = ( ) => {
        window.open( URL.OPEN_AI , '_blank' );
    }

</script>

<template>

<div class="gpt_block">
    <Button
        v-tooltip.right="t('add_token_page.token_info')"
        icon="pi pi-question-circle"
        severity="secondary"
        text
        @click="onOpenLink"
    />
    <InputText
        :placeholder="t('add_token_page.token')"
        :modelValue="value"
        @input="onInput(($event.target as HTMLInputElement).value)"
    />
    <div class="save_block">
        <Checkbox
            v-tooltip.left="t('add_token_page.save_tooltip')"
            :binary="true"
            v-model="isSaveToken"
            @change="onChange"
        />
    </div>
</div>


</template>

<style scoped>
    .gpt_block{
        display              : grid;
        align-items          : center;
        grid-template-columns: 1fr 9fr 1fr;
        column-gap           : 10px;
        width                : 100%;
    }

    .save_block{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

</style>