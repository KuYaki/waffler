<script setup lang="ts">
    import { ref, onMounted, type Ref } from 'vue';

    import  DropdownData  from '@/data/component/dropdown'
    import MultiSelect from "primevue/multiselect";

    import type { TDropdown } from './types'

    //////////////////// Defines /////////////////////////

    // const props = defineProps({})

    const emit = defineEmits<{
        ( e: 'changeSource',     value:TDropdown[]): void,
        ( e: 'changeProperties', value:TDropdown[]): void,
    }>();


    //////////////////// Hooks //////////////////////////

    onMounted(()=>{
        onChangeSource()
        onChangeProperties()
    })


    //////////////////// Vars ////////////////////////////

    const selectedSources   :Ref<TDropdown[]> = ref(DropdownData.source)
    const selectedProperties:Ref<TDropdown[]> = ref(DropdownData.property)

    const sources    = ref( DropdownData.source )
    const properties = ref( DropdownData.property)


    /////////////////// Messages ////////////////////////

    const onChangeProperties = () => {
        emit('changeProperties', selectedProperties.value)
    }

    const onChangeSource = () => {
        emit('changeSource', selectedSources.value)
    }

</script>

<template>
    <div class="params">

        <MultiSelect
            v-model="selectedSources"
            display="chip"
            :options="sources"
            optionLabel="label"
            placeholder="Sources"
            :maxSelectedLabels="2"
            @update:modelValue="onChangeSource" />

        <MultiSelect
            v-model="selectedProperties"
            display="chip"
            :options="properties"
            optionLabel="label"
            placeholder="Properties"
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