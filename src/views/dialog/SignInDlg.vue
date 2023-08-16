<script setup lang="ts">
    import { ref, Ref, onMounted } from 'vue';

    import InputText     from '@/components/input/InputText.vue';
    import InputPassword from '@/components/input/InputPassword.vue';
    import Button        from 'primevue/button';
    import Divider       from 'primevue/divider';


    ////////////////////////// Vars ////////////////////////////////

    let viewMode: Ref<'signInMode' | 'regMode'> = ref('signInMode')

    const login    = ref('admin')
    const password = ref('password')


    ////////////////////////// Hooks ////////////////////////////////

    onMounted(()=>{
        viewMode.value = 'signInMode'
    })


    ////////////////////////// Functions ///////////////////////////

    const switchToSignInMode = () => {
        viewMode.value = 'signInMode'
    }

    const switchToRegMode = () => {
        viewMode.value = 'regMode'
    }

    const test = ()=>{ console.log('BLUR')}

</script>

<template>
    <div class="sign_in">
        <i
            v-if="viewMode == 'regMode'"
            class="pi pi-angle-left"
            @click="switchToSignInMode"
        ></i>
        <p v-if ="viewMode == 'signInMode'">SIGN IN Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
        <p v-if="viewMode == 'regMode'">REG  Lorem ipsum dolor sit amet.</p>
        <InputText
            v-model:value="login"/>

        <InputPassword
            v-model:value="password"/>

        <Button
            v-if ="viewMode == 'signInMode'"
            label="Sign in"
            severity="success"
            @click="switchToRegMode"/>

        <Button
            v-if="viewMode == 'regMode'"
            label="Registration"
            severity="danger" />

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
        top      : -10px;
        font-size: 1.2rem;
        padding  : 10px;
        cursor   : pointer;
    }

    p{
        max-width: 235px;
        width:100%;
    }

</style>