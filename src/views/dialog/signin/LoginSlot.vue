<script setup lang="ts">
    import { ref, Ref, onMounted } from 'vue';
    import { t }                   from '@/util/locale';

    import { Credentials }            from '@/model/Authentication';
    import { signIn, authentication } from "@/helper/UseAuthenStore"


    import PlaceholderData  from '@/data/component/input'

    import InputText     from 'primevue/inputtext';
    import Password      from 'primevue/password';
    import Button        from 'primevue/button';


    ////////////////////////// Defines /////////////////////////////

    const emit = defineEmits<{
        (e: 'authorized'): void,
        (e: 'switchToRegister'): void,
    }>();


    ////////////////////////// Vars ////////////////////////////////


    const credentials: Ref<Credentials> = ref ( new Credentials )

    ////////////////////////// Hooks ////////////////////////////////

    onMounted(()=>{

    })


    ////////////////////////// Functions ///////////////////////////

    const switchToRegMode = () => {
        emit('switchToRegister')
    }

    const signin = async () => {
        await signIn(credentials.value)
            .then(() => {

                const isAuth = authentication().isAuthenticated()

                if ( isAuth ){
                    emit('authorized')
                } else {
                    switchToRegMode()
                }
            })
    }

</script>

<template>
    <div class="sign_in text">
        <p>

            {{ t('sign_in_page.sign_in_info') }}

        </p>
        <InputText
            v-model="credentials.username"
            :placeholder="t(PlaceholderData.login)"
        />
        <Password
            toggleMask
            v-model:modelValue="credentials.password"
            :placeholder="t(PlaceholderData.password)"
            :feedback="false"/>

        <Button
            :label="t('sign_in_page.sign_in')"
            severity="success"
            @click="signin"/>
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
    }
    p{
        max-width: 235px;
        width:100%;
    }

</style>