<script setup lang="ts">
    import { ref } from 'vue';

    import InputText from '@/components/input/InputText.vue';
    import Navbar    from '@/components/navbar/Navbar.vue'

</script>

<template>
    <Navbar/>
    <div class="main_page">
        <InputText/>
    </div>
</template>

<style scoped>
    .main_page{
        background-color     : pink;
        display              : grid;
        grid-template-columns: 100%;
        align-items          : center;
        margin               : auto;
        max-width            : 600px;
    }
</style>