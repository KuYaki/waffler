<script setup lang="ts">
    import { ref } from 'vue';

    import InputText      from '@/components/input/InputText.vue'
    import SourceDropdown from '@/components/dropdown/SourceDropdown.vue';
    import ToggleTheme    from '@/components/input/ToggleTheme.vue';
    import SignInTab      from '@/views/tabs/SignInTab.vue'
    import Divider        from 'primevue/divider';

    const searchValue = ref('some links')
</script>

<template>
    <div class="main_page">
        <Divider align="center">input url</Divider>
        <InputText v-model:value = 'searchValue'/>
        {{ searchValue }}

        <Divider align="center">Multiselect</Divider>
        <SourceDropdown/>

        <Divider align="center"> Theme toggle </Divider>
        <ToggleTheme/>

        <Divider align="center">SignInTab</Divider>
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