<script setup lang="ts">
    import { ref } from 'vue';

    import InputText     from '@/components/input/InputText.vue';
    import InputPassword from '@/components/input/InputPassword.vue';
    import Button        from 'primevue/button';
    import Divider       from 'primevue/divider';

    let login    = ref('admin')
    let password = ref('password')


</script>

<template>
    <div class="sign_in" >
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
        display        : grid;
        align-items    : center;
        row-gap: 10px;
        justify-content: center;
        width: 100%;
        max-width      : max-content;
        padding        : 30px;
    }

</style>