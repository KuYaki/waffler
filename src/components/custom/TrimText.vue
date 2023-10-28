<script setup lang="ts">
    import { computed, ref } from 'vue';

    ///////////////// Defines ///////////////////

    const props = defineProps({
        value: {
            type: String,
            default: ''
        }
    })


    //////////////// Vars //////////////////////

    const isShowTrimValue = ref(true)

    const chars = 50

    const trimText = computed(()=>{
        if( props.value.length < chars ) return props.value
        else return props.value.slice(0, chars) + '...'
    })


    /////////////// Messages //////////////////

    const onClick = () => {
        if( props.value.length < chars ) return

        isShowTrimValue.value = !isShowTrimValue.value
    }


</script>

<template>
    <div class="trim_text_block" @click="onClick">
        <div v-if="isShowTrimValue" class="trim_text"> {{ trimText}} </div>
        <div v-else class="full_text"> {{ value }}</div>
    </div>

</template>

<style scoped>

    .trim_text_block{
        word-break: break-all;
    }

</style>