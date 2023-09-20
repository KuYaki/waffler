<script setup lang="ts">
    import { ref } from 'vue';


    ////////////////////// Defines ////////////////////

    const props = defineProps({
        columnStyle:{
            type: String,
            default:''
        },
        height:{
            type:String,
            default:'60vh'
        },
        isListEmpty:{
            type:Boolean,
            default:false
        }
    })

    const emit = defineEmits<{
        (e: 'scroll_bottom'): void,
    }>();


    //////////////////// Vars ////////////////////////

    const isMakeEmit = ref( true )


    ///////////////////// Messages ///////////////////

    const onScroll = (event:any) =>{
        const el = event.target
        const position = el.scrollHeight - el.scrollTop - el.clientHeight
        if ( position < 2 && isMakeEmit.value ){
            console.log('BOTTOM')
            emit('scroll_bottom')
            isMakeEmit.value = false
            setTimeout(()=> isMakeEmit.value = true, 500)
        }
    }

</script>

<template>
    <div class="table">

        <div class="header">
            <slot name = 'header'> </slot>
        </div>

        <div
            v-if="!isListEmpty"
            class="row_block"
            @scroll="onScroll">
            <slot name = 'row'> </slot>
        </div>

        <div v-if="isListEmpty" class="empty_list">
            <slot name = 'empty'> </slot>
        </div>

    </div>

</template>

<style scoped>

    .table{
        width      : 100%;
        user-select: none;
    }

    .header{
        display              : grid;
        grid-template-columns: v-bind(columnStyle);
        margin-bottom        : 20px;
    }

    .row_block{
        /* max-height: 60vh; */
        height    : v-bind(height);
        overflow  : scroll;
    }

    .empty_list{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 200px;

    }

</style>