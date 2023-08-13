<script setup lang="ts">
    import Avatar from 'primevue/avatar'
    import router from '@/router';

    const goToRegistration = () =>{
        router.push('/sign_in')
    }

</script>

<template>
    <div class="profile">
        <Avatar
            icon="pi pi-user"
            class="mr-2"
            size="large"
            style="background-color: #2196f3; color: #ffffff"
            shape="circle"
            @click = "goToRegistration" />
    </div>

</template>

<style>
    .profile{
        padding: 0 5px;
    }

</style>