<script setup lang="ts">
    import { t } from '@/util/locale';
    import { PropType } from 'vue';
    import { Sorted } from '@/model/MainTable'

    /////////////////////// Defines ///////////////////////

    const props = defineProps({
        columns:{
            type: Object as PropType<Array<any>>,
            default:[]
        }
    })

    const emit = defineEmits<{
        ( e: 'click', idx: number): void,

    }>();

    ////////////////////// Messages //////////////////////

    const onClick = (idx:number) =>{
        emit('click', idx)
    }

</script>

<template>
    <div
        v-for=" ( column, i ) in columns"
        class="header_cell custom-table-header text"
        @click="onClick(i)"
    >
            {{ t(column.label) }}

            <i v-if="column.sorted == Sorted.UP"    class="pi pi-arrow-up"></i>
            <i v-if="column.sorted == Sorted.DOWN"  class="pi pi-arrow-down"></i>

    </div>

</template>

<style scoped>
    .header_cell{
        cursor     : pointer;
        padding    : 20px 5px;
        min-width  : max-content;
        font-weight: bold;
        font-size  : 16px;
    }


</style>