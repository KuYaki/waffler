<script setup lang="ts">
import { ref, onMounted, onUpdated, computed, toRefs, type PropType } from 'vue';
import { Service } from '@/components/table/Servise';
import { t } from '@/util/locale'

import DataTable from 'primevue/datatable';
import Column    from 'primevue/column';
import Skeleton  from 'primevue/skeleton';
import Divider   from 'primevue/divider';

import Table from './Table.vue';
import TableHeader from './TableHeader.vue';
import Row from './Row.vue';
import RowCell from './RowCell.vue';


import { ColumnMainTable} from '@/model/MainTable'
import { Source } from '@/model/MainPage'

///////////////////// Defines ///////////////////////////

const props = defineProps({
    columns :{
        type: Object as PropType<Array<ColumnMainTable>>,
        default:[]
    },
    data:{
        type : Object as PropType<Array<Source>>,
        default:[]
    }
})

const emit = defineEmits<{
    ( e: 'sorted', idx: number): void,
    ( e: 'openProfile'):void,
}>();


///////////////////// Hooks /////////////////////////////

onMounted(() => {

});


//////////////////// Vars ///////////////////////////////



/////////////////////Computed ///////////////////////////
const gridColumns = computed(()=> {
    let result = ''
    props.columns.forEach( el => result = result + ' ' + el.width )
    return result
})


//////////////////// Messages ///////////////////////////

const test = ( node:any ) => {
    alert(JSON.stringify(node.data))
    emit('openProfile')
}

const sortByFields = (column:ColumnMainTable, idx:number) => {

    alert ("sort by " + column.field )

    emit('sorted', idx)
}


</script>

<template>
    <div class="main_table">
        {{ gridColumns }}
        <Table :column-style="gridColumns">
            <template v-slot:header>
                <TableHeader :columns="columns"/>
            </template>

            <template v-slot:row>
                <Row v-for="(row, i) in data"
                    :column-style="gridColumns"
                >
                    <RowCell
                        v-for="col in columns"
                        :text="row[col.field]"/>
                </Row>
            </template>

        </Table>



        <!-- <div class="slot">
            <slot></slot>

        </div> -->
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