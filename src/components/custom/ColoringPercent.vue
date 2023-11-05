<script setup lang="ts">
    import { computed } from 'vue';

    const props = defineProps({
        value: {
            type: Number,
            default: 0
        }
    })

    const color = computed(()=>{
        if(props.value< 33) return '#1ad61d'
        else if( props.value < 66 ) return '#e38914'
        else return '#db1414'
    })

    const userValue = computed(()=> {
        if (props.value == null) return 0
        return props.value.toFixed(1)
    })

</script>

<template>
    <div class="percent_block" :style="{ color: color }">
        {{ userValue }}%
    </div>

</template>

<style scoped>
    .percent_block{
        font-weight:700;
    }

</style>