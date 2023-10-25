<script setup lang="ts">
import { ref } from 'vue';
import { t }   from '@/util/locale';

import Textarea from 'primevue/textarea';
import Button   from 'primevue/button';


///////////////////// Vars /////////////////////

let value = ref('')


/////////////////// Messages //////////////////

const onSendMsg = () =>{
    alert(`send mail ${ value.value}`)
}


</script>

<template>
    <div class="author_block">
        <Textarea v-model="value" autoResize rows="5" cols="30" />
        <Button @click="onSendMsg" type="submit" :label="t('footer.send_btn')" />
    </div>

</template>

<style scoped>
    .author_block{
        display: grid;
        row-gap: 10px;
    }
</style>