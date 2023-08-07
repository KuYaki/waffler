<script setup lang="ts">
    import { ref } from 'vue';

    import InputText      from '@/components/input/InputText.vue'
    import SourceDropdown from '@/components/dropdown/SourceDropdown.vue';
    import ToggleTheme    from '@/components/input/ToggleTheme.vue';
    import SignInTab      from '@/views/tabs/SignInTab.vue'

    const searchValue = ref('some links')
</script>

<template>
    <div class="main_page">
        <InputText v-model:value = 'searchValue'/>
        {{ searchValue }}
        <SourceDropdown/>
        <ToggleTheme/>
        <SignInTab/>


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