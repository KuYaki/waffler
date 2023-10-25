<script setup lang="ts">
import { t } from '@/util/locale';


////////////////// Messages //////////////

const onOpenLink = () =>{
    const openAILink = 'https://open.ai/'
    window.open( openAILink , '_blank' );
}

</script>

<template>
    <div class="policy_block">
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
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        font-size  : 1rem;
        font-weight: normal;
        color      : var(--text-color);
        cursor     : default;
    }

    .link{
        cursor     : pointer;
        font-weight: 700;
    }
</style>