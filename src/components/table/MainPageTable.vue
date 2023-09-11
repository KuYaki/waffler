<script setup lang="ts">
import { ref, onMounted, onUpdated, computed, toRefs, type PropType } from 'vue';
import { Service } from '@/components/table/Servise';
import { t } from '@/util/locale'

import DataTable from 'primevue/datatable';
import Column    from 'primevue/column';
import Skeleton  from 'primevue/skeleton';

import { ColumnMainTable } from '@/model/MainTable'


///////////////////// Defines ///////////////////////////

const props = defineProps({
    columns :{
        type: Object as PropType<Array<ColumnMainTable>>,
        default:[]
    }
})

const emit = defineEmits<{
    ( e: 'sorted', idx: number): void,
    ( e: 'openProfile'):void,
}>();


///////////////////// Hooks /////////////////////////////

onMounted(() => {
    cars.value = Array.from({ length: 100000 }).map((_, i) => Service.generate(i + 1));
});


//////////////////// Vars ///////////////////////////////

const cars            = ref();

const virtualCars     = ref(Array.from({ length: 100000 }));

const lazyLoading     = ref(false);

const loadLazyTimeout = ref();

const { columns } = toRefs( props )

/////////////////////Computed ///////////////////////////



//////////////////// Messages ///////////////////////////

const loadCarsLazy = (event:any) => {
    !lazyLoading.value && (lazyLoading.value = true);

    if (loadLazyTimeout.value) {
        clearTimeout(loadLazyTimeout.value);
    }

    //simulate remote connection with a timeout
    loadLazyTimeout.value = setTimeout(() => {
        let _virtualCars = [...virtualCars.value];
        let { first, last } = event;

        //load data of required page
        const loadedCars = cars.value.slice(first, last);

        //populate page of virtual cars
        Array.prototype.splice.apply(_virtualCars, [...[first, last - first], ...loadedCars]);

        virtualCars.value = _virtualCars;
        lazyLoading.value = false;
    }, Math.random() * 1000 + 250);
};

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
        <DataTable
            :value="virtualCars"
            scrollable
            scrollHeight="65vh"
            @row-click="test"
            tableStyle="max-width: 100%; "
            :virtualScrollerOptions="{
                lazy: true,
                onLazyLoad: loadCarsLazy,
                itemSize: 46,
                delay: 200,
                showLoader: true,
                loading: lazyLoading,
                numToleratedItems: 10
            }">


            <Column
                v-for="(column, i ) in columns"
                :field  = column.field
                :style = '{ width: column.width }' >

                    <template #loading>
                        <div>
                            <Skeleton width="40%" height="1rem" />
                        </div>
                    </template>

                    <template #header>
                        <span
                            class="column"
                            @click="sortByFields(column, i)"
                        >
                            <i
                                v-if="column.sorted"
                                class="pi pi-arrow-down"
                                style="font-size: 15px"></i>

                            {{ t(column.label) }}
                        </span>
                     </template>
            </Column>

        </DataTable>

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

    .column{
        cursor: pointer;
        width: max-content;
    }

    @media (max-width: 500px) {
        .slot{
            bottom  : 30px;
            right   : 20px;
        }
    }

</style>