<script setup lang="ts">
    import { onMounted, ref } from 'vue';

    import { t } from '@/util/locale';


    import Button        from 'primevue/button';
    import Dialog        from 'primevue/dialog';


    //////////////// Defines ///////////////////

    const emit = defineEmits<{
        (e: 'openPolicy'): void,
        (e: 'openAuthor'): void,
    }>();


    //////////////// Vars //////////////////////

    let isInfoDlgOpen = ref( false )


    const gitUrl     = 'https://github.com/KuYaki/waffler_server'
    const chatGPTUrl = 'https://chat.openai.com/'


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

    const openLink = (url:string) =>{
        window.open( url , '_blank' );
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

        <!--TODO: MAKE COMPONEN -->

        <div class="about_app">
            <span>{{ t('about_app.start_info') }}</span>
            <span class="link" @click="openLink(gitUrl)">{{ t('about_app.git_link') }}</span>
            <span>{{ t('about_app.close_bracket') }}</span>
            <br>
            <br>
            <span>{{ t('about_app.gpt_info') }}</span>
            <span class="link" @click="openLink(chatGPTUrl)">{{ t('about_app.ChatGPT') }}</span>
            <span>{{ t('about_app.gpt_info_footer') }}</span>
            <br>
            <br>
            <span>{{ t('about_app.author') }}</span>
            <span class="link" @click="onOpenAuthor">{{ t('about_app.author_link') }}</span>
            <br>
            <br>
            <span>{{ t('about_app.policy') }}</span>
            <span class="link" @click="onOpenPolicy">{{ t('about_app.policy_link') }}</span>
            <span>{{ t('about_app.policy_finish') }}</span>
        </div>

    </Dialog>

</template>

<style scoped>


</style>