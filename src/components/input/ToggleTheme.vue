<script setup lang="ts">
    import { ref } from 'vue';
    import { usePrimeVue } from 'primevue/config';

    import InputSwitch from 'primevue/inputswitch';

    /////////////// Vars ///////////////////

    const primevue = usePrimeVue()

    const darkTheme  = 'lara-dark-blue'
    const lightTheme = 'lara-light-blue'
    const themeLink  = 'theme_link'

    let isDarkMode = ref(false)
    /////////////// Messages ///////////////

    const toggleTheme = () => {
        if( isDarkMode.value ) primevue.changeTheme( lightTheme, darkTheme, themeLink )
        else primevue.changeTheme(darkTheme, lightTheme, themeLink )
    }

</script>

<template>
    <div class="toggle_theme">
        <InputSwitch
            v-model="isDarkMode"
            @change="toggleTheme"/>
        <i v-if = "!isDarkMode" class="pi pi-sun" style="font-size: 25px"></i>
        <i v-if = "isDarkMode" class="pi pi-moon" style="font-size: 25px"></i>
    </div>

</template>

<style scoped>
    .toggle_theme{
        display              : grid;
        grid-template-columns: max-content max-content;
        column-gap           : 5px;
        align-items          : center;
        padding              : 0 5px;
    }

</style>