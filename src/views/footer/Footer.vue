<script setup lang="ts">
import { ref } from 'vue';
import { t }   from '@/util/locale';

import Dialog      from 'primevue/dialog';
import PolicyDlg   from '@/views/footer/PolicyDlg.vue'
import AuthorDlg   from '@/views/footer/AuthorDlg.vue'
import ErrorMsgDlg from '@/views/footer/ErrorMsgDlg.vue'


////////////////// Vars /////////////////////////

let isPolicyDlgOpen   = ref(false)
let isAuthorDlgOpen   = ref(false)
let isErrorMsgDlgOpen = ref(false)


////////////////// Messages /////////////////////

const onOpenPolicyDlg= ()=>{
    isPolicyDlgOpen.value = true
}

const onOpenAuthorDlg= ()=>{
    isAuthorDlgOpen.value = true
}

const onOpenErrorMsgDlg= ()=>{
    isErrorMsgDlgOpen.value = true
}

defineExpose({
    onOpenPolicyDlg,
    onOpenAuthorDlg
})


</script>

<template>
    <div class="footer_block text">
        <span @click="onOpenPolicyDlg" class="link policy">{{ t('footer.policy_link') }}</span>
        <span @click="onOpenAuthorDlg" class="link author">{{ t('footer.author_link') }}</span>
        <span @click="onOpenErrorMsgDlg" class="link error_msg">{{ t('footer.error_msg_link') }}</span>
    </div>

    <Dialog
        v-model:visible="isPolicyDlgOpen"
        :modal="true"
        :dismissableMask="true"
        :header="t('footer.policy_link')"
        :style="{
            width: '90vw',
            maxWidth:'500px' }">

        <PolicyDlg />

    </Dialog>
    <Dialog
        v-model:visible="isAuthorDlgOpen"
        :modal="true"
        :dismissableMask="true"
        :header="t('footer.author')"
        :style="{
            width: '90vw',
            maxWidth:'500px' }">

        <AuthorDlg />

    </Dialog>
    <Dialog
        v-model:visible="isErrorMsgDlgOpen"
        :modal="true"
        :dismissableMask="true"
        :header="t('footer.error_msg')"
        :style="{
            width: '90vw',
            maxWidth:'500px' }">

        <ErrorMsgDlg />

    </Dialog>
</template>

<style scoped>
    .footer_block {
        display        : flex;
        align-items    : center;
        justify-content: center;
        flex-wrap      : wrap;
        width          : 100%;
        margin         : auto;
        padding        : 10px;
    }

    .link{
        cursor         : pointer;
        padding        : 3px;
    }
</style>