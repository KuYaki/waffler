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
        },
        showState:{
            type:Boolean,
            default:true
        }
    })
</script>

<template>

    <Skeleton
        v-if="state == DataState.LOADING && showState"
        width="50%">

    </Skeleton>

    <div
        v-else
        class="row_cell">
        {{ text }}
        <slot></slot>
    </div>


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