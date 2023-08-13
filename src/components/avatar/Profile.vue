<script setup lang="ts">
    import Avatar from 'primevue/avatar'

    const profileName = 'John Doe'
</script>

<template>
    <div class="profile">
        <Avatar
            icon="pi pi-user"
            class="mr-2"
            size="large"
            style="background-color: #2196f3; color: #ffffff"
            shape="circle" />

        <p class="profile_name">{{ profileName }}</p>
    </div>

</template>

<style scoped>
    .profile{
        display: flex;
        align-items: center;
    }
    .profile_name{
        font-weight: 700;
        font-size  : 20px;
        margin: 0 5px;
    }

</style>