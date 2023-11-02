<script setup lang="ts">
    import { ref, Ref, onMounted } from 'vue';
    import { t }                   from '@/util/locale';

    import { RegisterData }    from '@/model/Authentication';
    import { register, authentication } from "@/helper/UseAuthenStore"


    import PlaceholderData  from '@/data/component/input'

    import InputText     from 'primevue/inputtext';
    import Password      from 'primevue/password';
    import Button        from 'primevue/button';


    ////////////////////////// Defines /////////////////////////////

    const emit = defineEmits<{
        (e: 'authorized' )   : void,
        (e: 'switchToSignIn'): void
    }>();


    ////////////////////////// Vars ////////////////////////////////

    const regData: Ref<RegisterData>    = ref( new RegisterData )


    ////////////////////////// Hooks ////////////////////////////////

    onMounted(()=>{
    })


    ////////////////////////// Functions ///////////////////////////

    const switchToSignInMode = () => {
        emit('switchToSignIn')
    }

    const regUser = async () => {
        await register(regData.value)
            .then(()=>{

                const isAuth = authentication().isAuthenticated()

                if ( isAuth ){
                    emit('authorized')
                } else {
                    // TODO: Check errors
                }
            })
    }

</script>

<template>
    <div class="register_block text">
        <i
            class="pi pi-angle-left"
            @click="switchToSignInMode"
        >
        </i>
        <p>

            {{ t('sign_in_page.auth_fail') }}

        </p>

        <InputText
            v-model="regData.username"
            :placeholder="t(PlaceholderData.login)"
        />

        <Password
            toggleMask
            v-model:modelValue="regData.retype_password"
            :placeholder="t(PlaceholderData.password)"
            :feedback="false"/>

        <Password
            toggleMask
            v-model:modelValue="regData.password"
            :placeholder="t(PlaceholderData.confirmPassword)"
            :feedback="false"/>

        <Button
            :label="t('sign_in_page.registration')"
            severity="danger"
            @click="regUser"/>

    </div>
</template>

<style scoped>
    .register_block{
        position       : relative;
        margin         : auto;
        display        : grid;
        align-items    : center;
        row-gap        : 10px;
        justify-content: center;
        width          : 100%;
        max-width      : max-content;
        padding        : 15px;
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