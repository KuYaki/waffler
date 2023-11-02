<script setup lang="ts">
    import { ref } from 'vue';

    import ToggleTheme          from '@/components/custom/ToggleTheme.vue';
    import LangSelect           from '@/components/custom/LangSelect.vue';
    import AboutApp             from '@/components/custom/AboutApp.vue';
    import Avatar               from '@/components/avatar/Avatar.vue';

    const emit = defineEmits<{
        (e: 'openSignIn'): void
        (e: 'openPolicy'): void,
        (e: 'openAuthor'): void,
    }>();


    //////////////// onMessage //////////////////

    const openSignInDlg = () =>{
        emit('openSignIn')
    }

    const onOpenPolicy = () => {
        emit('openPolicy')
    }

    const onOpenAuthor = () => {
        emit('openAuthor')
    }

</script>

<template>
    <div class="navbar">

        <AboutApp
            @open-author="onOpenAuthor"
            @open-policy="onOpenPolicy"
        />

        <div class="right_side">
            <ToggleTheme />
            <LangSelect />
            <!-- <Avatar
                @click = "openSignInDlg"/> -->
        </div>
    </div>
</template>

<style scoped>
    .navbar{
        display         : flex;
        align-items     : center;
        justify-content : space-between;
        max-width       : 1000px;
        width           : 100%;
        margin          : auto;
        padding: 5px 0;
    }
    .right_side {
        display    : flex;
        align-items: center;
    }


</style>