<script setup lang="ts">
    import { ref, Ref, onMounted } from 'vue';
    import { t }                   from '@/util/locale';

    import Button        from 'primevue/button';
    import Divider       from 'primevue/divider';


    ////////////////////////// Defines /////////////////////////////

    const emit = defineEmits<{
        (e: 'example'): void,
    }>();


    ////////////////////////// Vars ////////////////////////////////


    ////////////////////////// Hooks ////////////////////////////////




    ////////////////////////// Functions ///////////////////////////


</script>

<template>
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
</template>

<style scoped>

</style>