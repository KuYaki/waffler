<script setup lang="ts">


const props = defineProps({
        text:{
            default:''
        }
    })
</script>

<template>
    <div class="row_cell">
        {{ text }}
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