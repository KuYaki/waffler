<script setup lang="ts">
    import { t, getLocale, setLocale }   from '@/util/locale';
    import { ref } from 'vue';

    import SelectButton from 'primevue/selectbutton';

    const value = ref(getLocale())
    const langs = ref(['RU', 'EN'])

    const changeLang = () => {
        setLocale(value.value)
    }

</script>

<template>
    <SelectButton
        v-model="value"
        :options="langs"
        @change="changeLang"
        aria-labelledby="basic" />

    <br>

    {{ value }}
    {{ t('waffler') }}
</template>

<style>

</style>