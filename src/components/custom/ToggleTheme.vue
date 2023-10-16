<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import { usePrimeVue } from 'primevue/config';

    import InputSwitch from 'primevue/inputswitch';

    /////////////// Hooks //////////////////

    onMounted(()=>{
        const theme = localStorage['theme']

        if( !theme || theme == 'light' ) {
            isDarkMode.value = false
            setLightTheme()
        }
        else {
            isDarkMode.value = true
            setDarkTheme()
        }

    })


    /////////////// Vars ///////////////////

    const primevue = usePrimeVue()

    const darkTheme  = 'lara-dark-blue'
    const lightTheme = 'lara-light-blue'
    const themeLink  = 'theme_link'

    let isDarkMode = ref(false)

    /////////////// Messages ///////////////

    const toggleTheme = () => {
        if( isDarkMode.value ) setDarkTheme()
        else setLightTheme()
    }


    /////////////// Functions ///////////////

    const setLightTheme = () => {
        localStorage.setItem('theme', 'light')
        primevue.changeTheme(darkTheme, lightTheme, themeLink )
    }

    const setDarkTheme = () => {
        localStorage.setItem('theme', 'dark')
        primevue.changeTheme( lightTheme, darkTheme, themeLink )

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