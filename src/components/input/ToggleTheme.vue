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

    const toggleTheme = () =>{
        if( isDarkMode.value ) primevue.changeTheme( lightTheme, darkTheme, themeLink )
        else primevue.changeTheme(darkTheme, lightTheme, themeLink )
    }

</script>

<template>
    <InputSwitch v-model="isDarkMode" @change="toggleTheme"/>
    Is dark mode?
    {{ isDarkMode }}

</template>

<style>

</style>