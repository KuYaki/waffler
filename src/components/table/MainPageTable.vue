<script setup lang="ts">
import {  computed, type PropType } from 'vue';
import { t } from '@/util/locale'

import Table from './Table.vue';
import TableHeader from './TableHeader.vue';
import Row from './Row.vue';
import RowCell from './RowCell.vue';
import Button from 'primevue/button';
import SourceProfile from '../avatar/SourceProfile.vue';


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
    },
    showState:{
        type:Boolean,
        default:true

    }
})

const emit = defineEmits<{
    ( e: 'sorted'  , idx: number): void,
    ( e: 'rowClick', idx: number): void,
    ( e: 'loadMore')             : void
    ( e: 'parseMore')            : void
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

const onRowClick = ( id:number ) => {
    emit('rowClick', id)
}

const sortByFields = ( idx:number) => {
    emit('sorted', idx)
}

const onParseMore = () =>{
    emit('parseMore')
}


</script>

<template>

    <div class="main_table">
        <Table
            :isListEmpty = 'isListEmpty'
            :column-style = "gridColumns"
            @scroll_bottom = "onLoad">

            <template v-slot:header>

                <TableHeader
                    @click="sortByFields"
                    :columns="columns"/>

            </template>

            <template v-slot:row >

                <Row
                    v-for="(row, i) in data"
                    :column-style="gridColumns"
                    @click="onRowClick(i)"
                >
                    <span v-for="column in columns">
                        <RowCell
                            v-if="column.field != 'source_type'"
                            :state="state"
                            :show-state="showState"
                            :text="row[column.field]"/>

                        <RowCell
                            v-else
                            :state="state"
                            :show-state="showState"
                            :text="''">

                            <SourceProfile
                                :source-type="row[column.field]"
                            />

                        </RowCell>

                    </span>

                </Row>

            </template>

            <template v-slot:empty >

                <Button
                    :label="t('profile_page.parse')"
                    @click="onParseMore"
                    outlined />

            </template>

        </Table>



        <div class="slot" v-if="!isListEmpty">
            <Button
                icon="pi pi-plus"
                rounded
                aria-label="Filter"
                @click="onParseMore" />

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