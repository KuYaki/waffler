<script setup lang="ts">
    import { ref } from 'vue';

    import Profile   from '@/components/avatar/Profile.vue'
    import Dropdown  from 'primevue/dropdown';
    import Button    from 'primevue/button';
    import ProfileTable from '@/components/table/ProfileTable.vue';

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
    <div class="profile_block">
        <div class="head">

            <Profile />

            <Dropdown
                v-model="currentField"
                display="chip"
                :options="fields"
                optionLabel="name"/>

        </div>

        <ProfileTable />

        <Button
            label="Primary"
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