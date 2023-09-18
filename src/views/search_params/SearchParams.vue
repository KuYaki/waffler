<script setup lang="ts">
    import { ref, onMounted, onUpdated, type Ref, computed } from 'vue';

    import { t } from '@/util/locale';

    import  DropdownData  from '@/data/component/dropdown'
    import MultiSelect from "primevue/multiselect";

    import type { TDropdown } from './types'

    //////////////////// Defines /////////////////////////

    // const props = defineProps({})

    const emit = defineEmits<{
        ( e: 'changeSource',     currentValue:TDropdown[], list:TDropdown[]): void,
        ( e: 'changeProperties', currentValue:TDropdown[], list:TDropdown[]): void,
    }>();


    //////////////////// Hooks //////////////////////////

    onMounted(()=>{
        onChangeSource()
        onChangeProperties()
    })


    //////////////////// Vars ////////////////////////////

    const selectedSources   :Ref<TDropdown[]> = ref([])
    const selectedProperties:Ref<TDropdown[]> = ref([DropdownData.property[0]])

    const sources    = ref( DropdownData.source  )
    const properties = ref( DropdownData.property )


    /////////////////// Messages ////////////////////////

    const onChangeProperties = () => {
        emit( 'changeProperties', selectedProperties.value, DropdownData.property )
    }

    const onChangeSource = () => {
        emit( 'changeSource', selectedSources.value, DropdownData.source )
    }

</script>

<template>
    <div class="params">

        <MultiSelect
            v-model="selectedSources"
            display="chip"
            :options="sources"
            optionLabel="label"
            :placeholder="t('main_page.source')"
            :maxSelectedLabels="2"
            @update:modelValue="onChangeSource" />

        <MultiSelect
            v-model="selectedProperties"
            display="chip"
            :options="properties"
            optionLabel="label"
            :placeholder="t('main_page.score')"
            :maxSelectedLabels="2"
            @update:modelValue="onChangeProperties" />

    </div>
</template>

<style scoped>


    .params{
        width                : 100%;
        display              : grid;
        grid-template-columns: 49.5% 49.5%;
        column-gap           : 1%;
        box-sizing           : border-box;
        padding              : 10px 0;
    }

    @media (max-width: 500px) {
        .params{
            grid-template-columns: 100%;
            row-gap              : 10px;
        }
    }



</style>