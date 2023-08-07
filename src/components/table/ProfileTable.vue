<script setup lang="ts">
    import DataTable from 'primevue/datatable';
    import Column    from 'primevue/column';

    const products = [
        {
            id: '1000',
            theme:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni sunt deleniti quidem labore, repellat nihil ipsa aliquam ullam a?',
            score:'10%'
        },
        {
            id: '1001',
            theme:' Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, unde!',
            score:'4%'
        },
        {
            id: '1002',
            theme:'Lorem, ipsum dolor.',
            score:'5%'
        },
        {
            id: '1000',
            theme:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni sunt deleniti quidem labore, repellat nihil ipsa aliquam ullam a?',
            score:'10%'
        },
        {
            id: '1001',
            theme:' Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, unde!',
            score:'4%'
        },
        {
            id: '1002',
            theme:'Lorem, ipsum dolor.',
            score:'5%'
        },
        {
            id: '1000',
            theme:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni sunt deleniti quidem labore, repellat nihil ipsa aliquam ullam a?',
            score:'10%'
        },
        {
            id: '1001',
            theme:' Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, unde!',
            score:'4%'
        },
        {
            id: '1002',
            theme:'Lorem, ipsum dolor.',
            score:'5%'
        }
    ];

</script>

<template>

        <DataTable
            :value="products"
            removableSort
            paginator
            :rows="5"
            :rowsPerPageOptions="[5, 10]"
            tableStyle="min-width: 100%">
            <Column field="theme" style="width: 75%"></Column>
            <Column field="score" header="Score" sortable style="width: 25%"></Column>
        </DataTable>

</template>

<style>

</style>