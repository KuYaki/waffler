<script setup lang="ts">
import {  computed, type PropType } from 'vue';
import { t } from '@/util/locale'

import Table from './Table.vue';
import TableHeader from './TableHeader.vue';
import Row from './Row.vue';
import RowCell from './RowCell.vue';


import { TableColumn} from '@/model/MainTable'
import { Source } from '@/model/MainPage'
import { DataState } from '@/api/model/interface';


///////////////////// Defines ///////////////////////////

const props = defineProps({
    columns :{
        type: Object as PropType<Array<TableColumn>>,
        default:[]
    },
    data:{
        type : Object as PropType<Array<Source>>,
        default:[]
    },
    state:{
        type: Number,
        default:DataState.OK
    }
})

const emit = defineEmits<{
    ( e: 'sorted'  , idx: number): void,
    ( e: 'rowClick', idx: number): void,
    ( e: 'loadMore')             : void
}>();


/////////////////////Computed ///////////////////////////

const gridColumns = computed(()=> {
    let result = ''
    props.columns.forEach( el => result = result + ' ' + el.width )
    return result
})


//////////////////// Messages ///////////////////////////

const onLoad = () =>{
    emit('loadMore')
}

const onRowClick = ( id:number ) => {
    emit('rowClick', id)
}

const sortByFields = ( idx:number) => {
    emit('sorted', idx)
}


</script>

<template>
    <div class="main_table">
        <Table :column-style="gridColumns" @scroll_bottom="onLoad">
            <template v-slot:header>

                <TableHeader
                    @click="sortByFields"
                    :columns="columns"/>

            </template>

            <template v-slot:row>

                <Row v-for="(row, i) in data"
                    :column-style="gridColumns"
                    @click="onRowClick(i)"
                >
                    <RowCell
                        v-for="column in columns"
                        :state="state"
                        :text="row[column.field]"/>
                </Row>

            </template>

        </Table>



        <div class="slot">
            <slot></slot>

        </div>
    </div>
</template>

<style scoped>

    .main_table{
        position: relative;
    }

    .slot{
        position: absolute;
        bottom  : 20px;
        right   : 30px;
    }



    @media (max-width: 500px) {
        .slot{
            bottom  : 30px;
            right   : 20px;
        }
    }

</style>