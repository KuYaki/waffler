<script setup lang="ts">
    import { toRefs } from 'vue';

    import InputText from 'primevue/inputtext';

    //////////////// Defines ///////////////

    const props = defineProps({
        value: {
            type: String,
            default: 'Any Link'
        }
    })

    const emit = defineEmits<{
        (e: 'update:value', value: string): void,
    }>();


    /////////////// Vars ///////////////////

    const { value } = toRefs(props)


    /////////////// Messages ///////////////

    const onChange = ( newValue:string ) => {
        emit('update:value', newValue)
    }

</script>

<template>
    <InputText
        type="text"
        :value="value"
        @input="onChange(($event.target as HTMLInputElement).value)"
        size="small"/>

</template>

<style>

</style>