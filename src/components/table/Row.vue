<script setup lang="ts">
import Divider from 'primevue/divider';

const props = defineProps({
    columnStyle:{
        type: String,
        default:''
    }
})

const emit = defineEmits<{
    ( e: 'click'): void,
}>();


</script>

<template>
        <div class="row" @click="emit('click')">
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