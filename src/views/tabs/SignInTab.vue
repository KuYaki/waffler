<script setup lang="ts">
    import { ref } from 'vue';

    import InputText     from '@/components/input/InputText.vue';
    import InputPassword from '@/components/input/InputPassword.vue';
    import Button        from 'primevue/button';
    import Divider       from 'primevue/divider';
    import router from '@/router';

    let login    = ref('admin')
    let password = ref('password')

    const goToMainPage = () =>{
        router.push('/')
    }

</script>

<template>
    <div class="sign_in" >
        <i
            class="pi pi-angle-left"
            @click="goToMainPage"
        ></i>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
        <InputText
            v-model:value="login"/>

        <InputPassword
            v-model:value="password"/>

        <Button
            label="Sign in"
            severity="success" />

        <Divider align="center"><b>OR</b></Divider>

        <Button
            label="Sign in with Google"
            severity="help" />

        <Button
            label="Sign in with Facebook"
            severity="info" />
    </div>
</template>

<style scoped>
    .sign_in{
        position       : relative;
        margin         : auto;
        display        : grid;
        align-items    : center;
        row-gap        : 10px;
        justify-content: center;
        width          : 100%;
        max-width      : max-content;
        padding        : 15px;
        font-family    : -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        font-size      : 1rem;
        font-weight    : normal;
        color          : var(--text-color);
    }
    i{
        position : absolute;
        left     : -30px;
        top      : 0px;
        font-size: 1.2rem;
        padding  : 10px;

    }

    p{
        max-width: 235px;
        width:100%;
    }

</style>