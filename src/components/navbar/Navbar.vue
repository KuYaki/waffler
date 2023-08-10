<script setup lang="ts">
    import { ref } from 'vue';

    import ToggleTheme          from '@/components/input/ToggleTheme.vue';
    import LangSelect           from '@/components/input/LangSelect.vue';
    import Avatar               from '@/components/avatar/Avatar.vue'


</script>

<template>
    <div class="navbar">
        <ToggleTheme/>
        <LangSelect/>
        <Avatar/>
    </div>
</template>

<style scoped>
    .navbar{
        display         : flex;
        align-items     : center;
        justify-content : flex-end;
        max-width       : 1000px;
        width           : 100%;
        margin          : auto;
        padding: 5px 0;
    }

</style>