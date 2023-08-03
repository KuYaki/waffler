<script setup lang="ts">
    import { ref } from 'vue';

    import InputSearch    from '@/components/input/InputSearch.vue'
    import SourceDropdown from '@/components/dropdown/SourceDropdown.vue';
    import ToggleTheme    from '@/components/input/ToggleTheme.vue';


    const searchValue = ref('some links')
</script>

<template>
    <div class="main_page">
        <InputSearch v-model:value = 'searchValue'/>
        {{ searchValue }}
        <SourceDropdown/>

        <ToggleTheme/>
    </div>
</template>

<style scoped>
    .main_page{
        display              : grid;
        grid-template-columns: 100%;
        align-items          : center;
        margin               : auto;
        max-width            : 600px;
    }
</style>