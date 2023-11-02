<script setup lang="ts">
import { t } from '@/util/locale';


////////////////// Messages //////////////

const onOpenLink = () =>{
    const openAILink = 'https://open.ai/'
    window.open( openAILink , '_blank' );
}

</script>

<template>
    <div class="policy_block text">
        <span class="policy">{{ t('footer.policy_start') }}</span>
        <span class="policy link" @click="onOpenLink"> {{ t('footer.open_ai') }}</span>
        <span class="policy">{{ t('footer.policy_finish') }}</span>
    </div>

</template>

<style scoped>
    .policy_block {
        align-items: center;
        width      : 100%;
        margin     : auto;
        cursor     : default;
    }
</style>