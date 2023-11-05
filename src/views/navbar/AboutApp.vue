<script setup lang="ts">
    import { onMounted, ref } from 'vue';

    import { t } from '@/util/locale';


    import Button        from 'primevue/button';
    import Dialog        from 'primevue/dialog';
    import Description   from './about_app/Description.vue';


    //////////////// Defines ///////////////////

    const emit = defineEmits<{
        (e: 'openPolicy'): void,
        (e: 'openAuthor'): void,
    }>();


    //////////////// Vars //////////////////////

    let isInfoDlgOpen = ref( false )

    ////////////// Hooks ///////////////////////

    onMounted(()=>{

        if ( isFirstLoading() ){
            isInfoDlgOpen.value = true
        }
    })


    ////////////// Messages ///////////////////

    const onOpenDlg = ( ) => {
        isInfoDlgOpen.value = true
    }


    ///////////// Function /////////////////////

    const isFirstLoading = ():boolean => {
        const theme = window.localStorage.getItem('theme')
        const lang  = window.localStorage.getItem('language')

        return  theme == null && lang == null
    }


    ///////////// onMessages ////////////////////

    const onOpenPolicy = () => {
        emit('openPolicy')
    }

    const onOpenAuthor = () => {
        emit('openAuthor')
    }

</script>

<template>

    <Button
        icon="pi pi-question-circle"
        severity="secondary"
        text
        @click="onOpenDlg"/>

    <Dialog
        v-model:visible="isInfoDlgOpen"
        :draggable="false"
        :modal="true"
        :dismissableMask="true"
        :header="t('about_app.about_app')"
        :position="'topleft'"
        :style="{
            width: '90vw',
            maxWidth:'500px' }">

        <Description
            @openAuthor="onOpenAuthor"
            @openPolicy="onOpenPolicy"
        />

    </Dialog>

</template>

<style scoped>


</style>