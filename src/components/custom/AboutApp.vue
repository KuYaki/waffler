<script setup lang="ts">
    import { onMounted, ref } from 'vue';

    import Button        from 'primevue/button';
    import Dialog        from 'primevue/dialog';
    import Card          from 'primevue/card';


    //////////////// Vars //////////////////////

    let isInfoDlgOpen = ref( false )

    let showPolicy = ref(false)


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

    const showPolicyRules = () => {
        showPolicy.value = true
    }

    const hidePolicyRules = () => {
        showPolicy.value = false
    }


    ///////////// Function /////////////////////

    const isFirstLoading = ():boolean => {
        const theme = window.localStorage.getItem('theme')
        const lang  = window.localStorage.getItem('language')

        return  theme == null && lang == null
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
        header="Main Header"
        :position="'topleft'"
        :style="{
            width: '90vw',
            maxWidth:'500px' }"
        @after-hide="hidePolicyRules">

            <Card>
                <template #title> Some header </template>
                <template #content>
                    <div v-if = "!showPolicy">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis laudantium, non culpa temporibus voluptas illum dignissimos vel ratione eveniet repellat id, aut eius nam obcaecati. Tempore, ad ut consectetur illo cupiditate ea unde distinctio modi aliquam itaque suscipit doloribus quae.
                        <span @click = showPolicyRules> link to policy</span>
                    </div>
                    <div v-if = "showPolicy">
                        Policy!!! Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, et voluptatibus corporis ipsam accusantium non veniam ipsum amet beatae?
                    </div>
                </template>
            </Card>
    </Dialog>

</template>

<style scoped>

span{
    cursor: pointer;
}

</style>