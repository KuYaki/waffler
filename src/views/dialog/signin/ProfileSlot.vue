<script setup lang="ts">
    import { ref, Ref, onMounted } from 'vue';
    import { t }                   from '@/util/locale';

    import { Credentials, RegisterData }    from '@/model/Authentication';
    import { signIn, register, authentication } from "@/helper/UseAuthenStore"


    import PlaceholderData  from '@/data/component/input'

    import InputText     from 'primevue/inputtext';
    import Password      from 'primevue/password';
    import Button        from 'primevue/button';
    import Divider       from 'primevue/divider';
    import Profile   from '@/components/avatar/Profile.vue'



    ////////////////////////// Defines /////////////////////////////

    const emit = defineEmits<{
        (e: 'signOut'): void,
    }>();


    ////////////////////////// Vars ////////////////////////////////

    const username = ref('')


    ////////////////////////// Hooks ////////////////////////////////

    onMounted(()=>{
        username.value = authentication().getUserName()
    })


    ////////////////////////// Functions ///////////////////////////

    const signOut = () => {
        authentication().signOut()

        emit('signOut')
    }


</script>

<template>
    <div class="profile_block">
        <Profile
            :username="username"
        />
        <Button
            :label="t('sign_in_page.log_out')"
            severity="secondary"
            @click="signOut"/>
    </div>
</template>

<style scoped>

    .profile_block{
        width          : 100%;
        align-items    : center;
        display        : flex;
        flex-wrap      : wrap;
        row-gap        : 5px;
        column-gap     : 20px;
        justify-content: space-between;
    }

</style>