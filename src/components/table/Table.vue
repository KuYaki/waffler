<script setup lang="ts">
    import { PropType, computed } from 'vue';
    import Divider from 'primevue/divider';

    const props = defineProps({
        columnStyle:{
            type: String,
            default:''
        }
    })

</script>

<template>
    <div class="table">

        <div class="header">
            <slot name = 'header'> </slot>
        </div>

        <div class="row_block">
            <slot name = 'row'> </slot>
        </div>

    </div>

</template>

<style scoped>

    .table{
        width: 100%;
    }

    .header{
        display              : grid;
        grid-template-columns: v-bind(columnStyle);
        margin-bottom        : 20px;
    }

</style>