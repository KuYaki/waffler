<script setup lang="ts">
    import { PropType, computed } from 'vue';
    import Divider from 'primevue/divider';


    ////////////////////// Defines ////////////////////

    const props = defineProps({
        columnStyle:{
            type: String,
            default:''
        }
    })

    const emit = defineEmits<{
        (e: 'scroll_bottom'): void,
    }>();


    ///////////////////// Messages ///////////////////

    const onScroll = (event:any) =>{
        const el = event.target
        if ( el.scrollHeight - el.scrollTop - el.clientHeight < 2 ){
            console.log('BOTTOM')
            emit('scroll_bottom')
        }

    }

</script>

<template>
    <div class="table">

        <div class="header">
            <slot name = 'header'> </slot>
        </div>

        <div class="row_block" @scroll="onScroll">
            <slot name = 'row'> </slot>
        </div>

    </div>

</template>

<style scoped>

    .table{
        width      : 100%;
        user-select: none;
    }

    .header{
        display              : grid;
        grid-template-columns: v-bind(columnStyle);
        margin-bottom        : 20px;
    }

    .row_block{
        /* max-height: 60vh; */
        height    : 60vh;
        overflow  : scroll;
    }

</style>