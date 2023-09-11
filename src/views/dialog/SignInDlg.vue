<script setup lang="ts">
    import { ref, Ref, onMounted } from 'vue';
    import { t }                   from '@/util/locale';

    import { Credentials, RegisterData }    from '@/model/Authentication';
    import { signIn, register, authentication } from "@/helper/UseAuthenStore"

    import LoginSlot    from '@/views/dialog/signin/LoginSlot.vue';
    import OAuthSlot    from '@/views/dialog/signin/OAuthSlot.vue';
    import ProfileSlot  from '@/views/dialog/signin/ProfileSlot.vue';
    import RegisterSlot from '@/views/dialog/signin/RegisterSlot.vue';



    ////////////////////////// Defines /////////////////////////////

    const emit = defineEmits<{
        (e: 'authorized'): void,
    }>();


    ////////////////////////// Vars ////////////////////////////////

    let viewMode: Ref<'signInMode' | 'regMode' | 'authMode'> = ref('signInMode')



    ////////////////////////// Hooks ////////////////////////////////

    onMounted(()=>{
        if ( authentication().isAuthenticated() ) viewMode.value = 'authMode'
        else viewMode.value = 'signInMode'
    })


    ////////////////////////// Functions ///////////////////////////

    ///////////////////////// Messages ////////////////////////////

    const toRegMode = () => {
        viewMode.value = 'regMode'
    }

    const toAuthMode = () => {
        viewMode.value = 'authMode'
    }

    const toSignInMode = () => {
        viewMode.value = 'signInMode'
    }


</script>

<template>
    <div class="auth_block">

        <LoginSlot v-if ="viewMode == 'signInMode'"
            @switchToRegister="toRegMode"
            @authorized="toAuthMode"/>

        <RegisterSlot v-if="viewMode == 'regMode'"
            @switchToSignIn="toSignInMode"
            @authorized="toAuthMode"/>

        <OAuthSlot v-if="viewMode != 'authMode'"/>

        <ProfileSlot v-if = "viewMode == 'authMode'"
            @signOut="toSignInMode"
        />

    </div>
</template>

<style scoped>
    .auth_block{
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

</style>