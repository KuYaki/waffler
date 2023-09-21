<script setup lang="ts">
    import MainPage from '@/views/MainPage.vue'
</script>

<template>
    <!-- <MainPage/> -->
    <router-view/>
</template>

<style >

    ::-webkit-scrollbar{
        width: 5px;
    }
    ::-webkit-scrollbar-track{
        /* box-shadow: 0 0 5px #ddd; */
        border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb{
        background-color: var(--primary-color);
        border-radius: 4px;
    }

    ::-webkit-scrollbar-corner {
        background: var(--table-background);
    }

</style>
