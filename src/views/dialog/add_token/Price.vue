<script setup lang="ts">
    import { t } from '@/util/locale';

    import InputNumber, { InputNumberInputEvent }   from 'primevue/inputnumber';


    ///////////////// Defines ///////////////////

    const props = defineProps({
        limit: {
            type: Number,
            default:0
        },
        price: {
            type: Number,
            default:0
        },
        currency:{
            type: String,
            default: 'USDT'
        }

    })

    const emit = defineEmits<{
        (e: 'update:limit', value:number): void,
    }>();



    ////////////// Messages ////////////////////

    const onInputMsgNumber = (value:number) => {
        emit('update:limit', value)
    }


</script>

<template>

<div class="price_block">
    <InputNumber
        v-tooltip.top="t('add_token_page.msg_limit')"
        inputId="minmax"
        :min="0"
        :modelValue ="limit"
        @input="onInputMsgNumber(($event as InputNumberInputEvent).value as number)"
    />

    <span class="text price">
        {{ price }} {{ currency }}
    </span>
</div>

</template>

<style scoped>

.price_block{
    width                : 100%;
    display              : grid;
    grid-template-columns: 5fr 1fr;
    column-gap           : 10px;
    align-items: center;
}

</style>