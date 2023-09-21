<script setup lang="ts">
    import { computed }  from 'vue';

    import DropdownData  from '@/data/component/dropdown'

    /////////////// Defines /////////////////////

    const props = defineProps({
        sourceType: {
            type   : Number,
            default: null
        },
        label: {
            type: String,
            default: 'John Doe'
        }
    })

    const emit = defineEmits<{
        (e: 'click'): void,
    }>();


    //////////////// Computed ///////////////////////

    const sourceProfile = computed(() => DropdownData.source[props.sourceType])

    //TODO: ADDED IMAGE
    // #c4302b
    // #2AABEE
    const color =computed(() => {
        if (props.sourceType == 0) return '#2AABEE'
        else return '#c4302b'
    })

    //////////////  Messages ////////////////

    const onClick = () =>{
        emit('click')
    }

</script>

<template>
    <div class="source_profile_block" @click="onClick">
        <i
            :style="{fontSize: '2rem', color:color}"
            :class="sourceProfile.icon">
        </i>
        {{ label }}
    </div>

</template>

<style scoped>
    .source_profile_block{
        display    : flex;
        align-items: center;
        font-weight: 700;
        font-size  : 20px;
        cursor     : pointer;
    }

    i{
        margin: 5px;
    }
</style>