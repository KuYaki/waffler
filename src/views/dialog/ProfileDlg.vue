<script setup lang="ts">
    import { ref } from 'vue';

    import { t } from '@/util/locale';

    import DropdownData from '@/data/component/dropdown'

    import Profile   from '@/components/avatar/Profile.vue'
    import Dropdown  from 'primevue/dropdown';
    import Button    from 'primevue/button';
    import ProfileTable from '@/components/table/ProfileTable.vue';


    const currentField = ref( DropdownData.property[0]);

    const loading = ref(false)

    const load = () =>{
        loading.value = true
        setTimeout(()=> loading.value = false , 2000)
    }

</script>

<template>
    <div class="profile_block">
        <div class="head">

            <Profile />

            <Dropdown
                v-model="currentField"
                display="chip"
                :options="DropdownData.property"
                optionLabel="label"/>

        </div>

        <ProfileTable />

        <Button
            :label="t('profile_page.parse')"
            :loading="loading"
            @click="load"
            outlined />
    </div>
</template>


<style scoped>
    .profile_block {
        display: grid;
        grid-template-columns: 100%;
        row-gap: 10px;
    }

    .head {
        display: grid;
        grid-template-columns: 50% 50%;
        align-items: center;
    }

</style>