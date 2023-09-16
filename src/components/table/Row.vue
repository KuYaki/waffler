<script setup lang="ts">
import Divider from 'primevue/divider';

const props = defineProps({
        columnStyle:{
            type: String,
            default:''
        }
    })

</script>

<template>
        <div class="row">
            <slot></slot>
        </div>

        <Divider/>


</template>

<style scoped>
.row{
        display: grid;
        grid-template-columns: v-bind(columnStyle);
    }
</style>