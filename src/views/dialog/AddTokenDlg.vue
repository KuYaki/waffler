<script setup lang="ts">
    import { ref } from 'vue';

    import { t } from '@/util/locale';

    // import InputText from '@/components/input/InputText.vue';
    import InputText from 'primevue/inputtext';
    import Profile   from '@/components/avatar/Profile.vue'
    import Dropdown from 'primevue/dropdown';
    import Button   from 'primevue/button';

    const currentField = ref( { name: 'Waffler',  code: 'W' });
    const fields = ref([
        { name: 'Waffler',  code: 'W' },
        { name: 'Racizm',   code: 'R' },
    ]);

    const loading = ref(false)

    const load = () =>{
        loading.value = true
        setTimeout(()=> loading.value = false , 2000)
    }

</script>

<template>
    <div class="token">
        <span>{{ t('add_token_page.info') }}</span>
        <InputText
            :placeholder="t('add_token_page.link')"
        />
        <Profile/>
        <Dropdown
            v-model="currentField"
            display="chip"
            :options="fields"
            optionLabel="name"/>
        <InputText
            :placeholder="t('add_token_page.token')"
        />
        <Button
            :label="t('add_token_page.parse')"
            :loading="loading"
            @click="load"
            outlined />
    </div>
</template>


<style scoped>
    .token{
        display: grid;
        grid-template-columns: 100%;
        row-gap: 10px;
    }

</style>