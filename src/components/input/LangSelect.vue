<script setup lang="ts">
    import { t, getLocale, setLocale }   from '@/util/locale';
    import { ref } from 'vue';

    import Listbox from 'primevue/listbox';
    import Button from 'primevue/button';

    const currentLang = ref(getLocale())
    const langs = ref( ['RU','EN'] )

    let showList = ref(false)

    const changeLang = () => {
        setLocale(currentLang.value)
        hideLangList()
    }

    const toggleShowLang = () => showList.value = !showList.value
    const hideLangList   = () => showList.value = false

</script>

<template>
    <div class="lang_select">
        <Button
            @click="toggleShowLang"
            label="Primary"
            text >
                <i class="pi pi-language" style="font-size: 25px"></i>
        </Button>
        <!-- <transition name ='fade'> -->
            <span class="list" v-if="showList">
                <Listbox
                    :options="langs"
                    v-model="currentLang"
                    @change="changeLang"/>
            </span>
        <!-- </transition> -->
    </div>
</template>

<style>
    .fade-leave-active {
        transition-duration: .2s;
    }

    .lang_select{
        position: relative;
        padding: 0 5px;
    }

    .list {
        position: absolute;
        top     : 50px;
        left    : 8px;
        z-index: 1000;
    }

</style>