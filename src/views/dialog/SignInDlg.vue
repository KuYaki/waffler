<script setup lang="ts">
    import { ref, Ref, onMounted } from 'vue';
    import { t } from '@/util/locale';

    import PlaceholderData  from '@/data/component/input'

    // import InputText     from '@/components/input/InputText.vue';
    // import InputPassword from '@/components/input/InputPassword.vue';
    import InputText     from 'primevue/inputtext';
    import Password      from 'primevue/password';
    import Button        from 'primevue/button';
    import Divider       from 'primevue/divider';


    ////////////////////////// Vars ////////////////////////////////

    let viewMode: Ref<'signInMode' | 'regMode'> = ref('signInMode')

    const login    = ref('')
    const password = ref('')


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

</script>

<template>
    <div class="sign_in">
        <i
            v-if="viewMode == 'regMode'"
            class="pi pi-angle-left"
            @click="switchToSignInMode"
        ></i>
        <p
            v-if ="viewMode == 'signInMode'">
               {{ t('sign_in_page.sign_in_info') }}
        </p>
        <p
            v-if="viewMode == 'regMode'">
                {{ t('sign_in_page.auth_fail') }}
        </p>

        <InputText
            v-model="login"
            :placeholder="t(PlaceholderData.login)"
        />
        <Password
            toggleMask
            :modelValue="password"
            :placeholder="t(PlaceholderData.password)"
            :feedback="false"/>

        <Button
            v-if ="viewMode == 'signInMode'"
            :label="t('sign_in_page.sign_in')"
            severity="success"
            @click="switchToRegMode"/>

        <Button
            v-if="viewMode == 'regMode'"
            :label="t('sign_in_page.registration')"
            severity="danger" />

        <Divider
            align="center">
                <b>{{ t('sign_in_page.devider') }}</b>
            </Divider>

        <Button
            :label="t('sign_in_page.sign_in_google')"
            severity="help" />

        <Button
            :label="t('sign_in_page.sign_in_facebook')"
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