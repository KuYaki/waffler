<script setup lang="ts">
    import { t } from '@/util/locale';
    import { PropType } from 'vue';

    /////////////////////// Defines ///////////////////////

    const props = defineProps({
        columns:{
            type: Object as PropType<Array<any>>,
            default:[]
        }
    })

    const emit = defineEmits<{
        ( e: 'column_click', idx: number): void,

    }>();

    ////////////////////// Messages //////////////////////

    const onClick = (idx:number) =>{
        emit('column_click', idx)
    }

</script>

<template>
    <div
        v-for=" ( column, i ) in columns"
        class="header_cell custom-table-header"
        @click="onClick(i)"
    >
            {{ t(column.label) }}
            <i class="pi pi-arrow-up"></i>
            <i class="pi pi-arrow-down"></i>

    </div>

</template>

<style scoped>
    .header_cell{
        cursor     : pointer;
        padding    : 20px 5px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        font-weight: bold;
        font-size: 17px;
    }


</style>