<script setup lang="ts">
    import { PropType, toRefs } from 'vue';

    import { t } from '@/util/locale';

    import MultiSelect   from "primevue/multiselect";

    import type { TDropdown } from './types'

    //////////////////// Defines /////////////////////////

    const props = defineProps({
        sources:{
            type   : Object as PropType<TDropdown[]>,
            default: []
        },
        scores:{
            type: Object as PropType<TDropdown[]>,
            default:[]
        },
        curSources:{
            type: Object as PropType<TDropdown[]>,
            default:[]
        },
        curScores:{
            type: Object as PropType<TDropdown[]>,
            default:[]
        }
    })

    const emit = defineEmits<{
        ( e: 'update:curSources', currentValue:TDropdown[] ): void,
        ( e: 'update:curScores' , currentValue:TDropdown[] ): void,
    }>();


    //////////////////// Hooks //////////////////////////

    // onMounted(()=>{
    //     // onChangeSource()
    //     // onChangeProperties()
    // })


    //////////////////// Vars ////////////////////////////

    const  { curSources , curScores } = toRefs(props)


    /////////////////// Messages ////////////////////////

    const onChangeProperties = ( event:any ) => {
        emit('update:curScores', event.value)
    }

    const onChangeSource = ( event:any ) => {
        emit('update:curSources', event.value)
    }

</script>

<template>
    <div class="params">

        <MultiSelect
            :modelValue="curSources"
            display="chip"
            :options="sources"
            optionLabel="label"
            :placeholder="t('main_page.source')"
            :maxSelectedLabels="2"
            @change="onChangeSource"/>

        <MultiSelect
            :modelValue="curScores"
            display="chip"
            :options="scores"
            optionLabel="label"
            :placeholder="t('main_page.score')"
            :maxSelectedLabels="2"
            @change="onChangeProperties" />

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