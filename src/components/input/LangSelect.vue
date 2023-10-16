<script setup lang="ts">
    import { getLocale, setLocale }   from '@/util/locale';
    import { ref } from 'vue';

    import Listbox from 'primevue/listbox';
    import Button from 'primevue/button';
    import CountryFlag from '@/components/avatar/CountryFlag.vue'
    import Dropdown from 'primevue/dropdown';

    const currentLang = ref(getLocale())

    const langs = ref( ['RU','EN'] )

    let showList = ref(false)

    const changeLang = (event:any) => {

        const curValue = event.value

        if ( curValue != undefined ) {

            setLocale(curValue)

            currentLang.value = curValue
        }

        hideLangList()
    }

    // const toggleShowLang = () => showList.value = !showList.value
    const showLAngList = () => showList.value = true
    const hideLangList   = () => showList.value = false

</script>

<template>

    <div
        class="lang_select"
        @mouseleave = hideLangList>

        <CountryFlag
            @mouseover="showLAngList"
            :lang = "currentLang"/>

        <!-- <transition name ='fade'> -->
        <span class="list" v-if="showList">

            <Listbox
                :options="langs"
                :modelValue="currentLang"
                @mouseover = showLAngList
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
        cursor  : pointer;
        position: relative;
        padding : 0 5px;
    }

    .list {
        position: absolute;
        top     : 30px;
        left    : -8px;
        z-index: 1000;
    }

</style>