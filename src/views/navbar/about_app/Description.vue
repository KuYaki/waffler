<script setup lang="ts">
    import { t } from '@/util/locale';
    import URL from '@/global/urls';



    //////////////// Defines ///////////////////

    const emit = defineEmits<{
        (e: 'openPolicy'): void,
        (e: 'openAuthor'): void,
    }>();


    ///////////// Function /////////////////////

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
    <div class="about_app">
        <span>{{ t('about_app.start_info') }}</span>
        <span class="link" @click="openLink(URL.GIT_HUB)">{{ t('about_app.git_link') }}</span>
        <span>{{ t('about_app.close_bracket') }}</span>
        <br>
        <br>
        <span>{{ t('about_app.gpt_info') }}</span>
        <span class="link" @click="openLink(URL.CHAT_GPT)">{{ t('about_app.ChatGPT') }}</span>
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


</template>

<style scoped>


</style>