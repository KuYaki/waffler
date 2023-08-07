<script setup lang="ts">
    import { toRefs } from 'vue';

    import Password from 'primevue/password';

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
    <Password
        toggleMask
        :feedback="false"
        :modelValue = 'value'
        @input="onChange(($event.target as HTMLInputElement).value)"/>

</template>

<style>

</style>