<script setup lang="ts">
import { t } from '@/util/locale'
import { computed, type PropType } from 'vue';


import Table from './Table.vue';
import TableHeader from './TableHeader.vue';
import Row from './Row.vue';
import RowCell from './RowCell.vue';
import ColoringPercent from '../custom/ColoringPercent.vue';

import { DataState } from '@/api/model/interface';
import { Records } from '@/model/MainPage';
import { TableColumn } from '@/model/MainTable';



///////////////////// Defines ///////////////////////////

const props = defineProps({
    columns :{
        type: Object as PropType<Array<TableColumn>>,
        default:[]
    },
    data:{
        type : Object as PropType<Array<Records>>,
        default:[]
    },
    state:{
        type: Number,
        default:DataState.OK
    }
})

const emit = defineEmits<{
    ( e: 'sorted'  , idx: number): void,
    ( e: 'loadMore')             : void
}>();


/////////////////////Computed ///////////////////////////

const gridColumns = computed(()=> {
    let result = ''
    props.columns.forEach( el => result = result + ' ' + el.width )
    return result
})

const isListEmpty = computed(()=> props.data.length == 0)


//////////////////// Messages ///////////////////////////

const onLoad = () =>{
    emit('loadMore')
}

const sortByFields = ( idx:number) => {
    emit('sorted', idx)
}

</script>

<template>

    <div class="score_table">
        <Table
            :is-list-empty="isListEmpty"
            :column-style="gridColumns"
            :height="'300px'"
            @scroll_bottom="onLoad">
            <template v-slot:header>

                <TableHeader
                    @click="sortByFields"
                    :columns="columns"/>

            </template>

            <template v-slot:row>

                <Row v-for="(row, i) in data"
                    :column-style="gridColumns"
                >

                    <span v-for="column in columns">

                        <RowCell
                            v-if="column.field == 'record_text'"
                            :state="state"
                            :text="row[column.field]"/>


                        <RowCell
                            v-else
                            :state="state"
                            :text="''">

                            <ColoringPercent :value="row[column.field]"/>

                        </RowCell>

                    </span>
                </Row>

            </template>

            <template v-slot:empty >

                {{ t('profile_page.empty_list') }}

            </template>

        </Table>
    </div>
</template>

<style>

</style>