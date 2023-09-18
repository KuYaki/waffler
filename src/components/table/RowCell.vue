<script setup lang="ts">
import { DataState } from '@/api/model/interface';
import Skeleton from 'primevue/skeleton';


const props = defineProps({
        text:{
            default:''
        },
        state:{
            type: Number,
            default:DataState.OK
        }
    })
</script>

<template>
    <div
        v-if="state == DataState.OK || state == DataState.ERROR"
        class="row_cell">
        {{ text }}
    </div>

    <Skeleton
        v-if="state == DataState.LOADING"
        width="50%">

    </Skeleton>
</template>

<style scoped>

    .row_cell{
        cursor     : pointer;
        display    : flex;
        align-items: center;
        padding    : 0 10px;
        font-size  : 15px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    }


</style>