<script setup lang="ts">
    import { computed }  from 'vue';
    import { t } from '@/util/locale';

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

    const showProfile = computed(()=> props.label.length > 0)
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
    <div
        v-if="showProfile"
        class="source_profile_block"
        @click="onClick"
    >
        <i
            :style="{fontSize: '2rem', color:color}"
            :class="sourceProfile.icon">
        </i>
        {{ label }}
    </div>
    <div v-else class="source_profile_block">
        {{ t('add_token_page.need_link') }}
    </div>

</template>

<style scoped>
    .source_profile_block{
        display    : flex;
        align-items: center;
        font-weight: 700;
        font-size  : 20px;
        cursor     : pointer;
        min-width  : min-content;
    }

    i{
        margin: 5px;
    }
</style>