<script setup lang="ts">
    import { ref, type Ref } from 'vue';

    import  DropdownData  from '@/data/component/dropdown'

    import MultiSelect from "primevue/multiselect";

    //////////////////// Defines /////////////////////////

    // const props = defineProps({})

    const emit = defineEmits<{
        ( e: 'changeProperties', value:{label:string}[]): void,
    }>();



    //////////////////// Vars ////////////////////////////

    const selectedProperties:Ref<{label:string}[]> = ref()
    const selectedSorces     = ref()

    const sources    = ref(DropdownData.source )
    const properties = ref(DropdownData.property)


    /////////////////// Messages ////////////////////////

    const onChangeProperties = ( ) => {
        emit('changeProperties', selectedProperties.value)
    }

</script>

<template>
    <div class="params">

        <MultiSelect
            v-model="selectedSorces"
            display="chip"
            :options="sources"
            optionLabel="name"
            placeholder="Select Cities"
            :maxSelectedLabels="2" />

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