<script setup lang="ts">
import { ref, onMounted, type PropType } from 'vue';
import { Service } from '@/components/table/Servise';
import { t } from '@/util/locale'

import DataTable from 'primevue/datatable';
import Column    from 'primevue/column';
import Skeleton  from 'primevue/skeleton';

import type { TDropdown } from '@/views/search_params/types';

const props = defineProps({
    properties :{
        type: Object as PropType<Array<TDropdown>>,
        default:[]
    }
})

onMounted(() => {
    cars.value = Array.from({ length: 100000 }).map((_, i) => Service.generate(i + 1));
});

const cars = ref();
const virtualCars = ref(Array.from({ length: 100000 }));
const lazyLoading = ref(false);
const loadLazyTimeout = ref();

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
</script>


<template>
    <div class="main_table">
        <DataTable
            :value="virtualCars"
            scrollable
            removableSort
            scrollHeight="70vh"
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
                sortable
                field="name"
                :header="t('main_page.name')"
                style="width: 30%">
                    <template #loading>
                        <div>
                            <Skeleton width="40%" height="1rem" />
                        </div>
                    </template>
            </Column>
            <Column
                sortable
                field="source"
                :header="t('main_page.source')"
                style="width: 10%">
                    <template #loading>
                        <div>
                            <Skeleton width="40%" height="1rem" />
                        </div>
                    </template>
            </Column>
            <Column
                v-for="property in properties"
                sortable
                :field  = property.key
                :header = t(property.tableHeader)
                style  = "width: 15%">
                    <template #loading>
                        <div>
                            <Skeleton width="40%" height="1rem" />
                        </div>
                    </template>
            </Column>
            <!-- <Column
                sortable
                field="racizm"
                header="Racizm"
                style="width: 15%">
                    <template #loading>
                        <div>
                            <Skeleton width="40%" height="1rem" />
                        </div>
                    </template>
            </Column> -->
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

    @media (max-width: 500px) {
        .slot{
            bottom  : 30px;
            right   : 20px;
        }
    }

</style>