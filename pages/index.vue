<template>
    <main class="flex flex-col mx-5">
        <div class="items-center mt-10 desktop:flex desktop:justify-between">
            <MoleculeSearchInput class="flex-grow-0" />
            <!-- Select country -->
            <MoleculeFilterInput class="flex-grow-0" />
        </div>
        <section class="gap-10 desktop:grid desktop:grid-cols-4 desktop:grid-flow-row-dense">
            <OrganismCard
                v-if="filtered(countrySearchInput, continentFilter)"
                v-for="(item,index) in filtered(countrySearchInput, continentFilter)"
                :key="index"
                :item="item"
            />
            <div v-else class="mx-auto mt-10">No results...</div>
        </section>
    </main>
</template>
<script setup lang="ts">
const { data, refresh } = await useAsyncData('countries', () => $fetch('/api/countries'))
const loading = useLoading()
const countrySearchInput = useCountrySearch()
const continentFilter = useContinentFilter()
const filterType = useFilterType()
console.log(data.value);


const filtered = (search, filter) => {
    switch (filterType.value) {
        case 'search':
            if (search === '') return data.value
            if (search) {
                console.log('search');

                function filterItems(arr, query) {
                    return arr.filter((el) => {
                        return el.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
                    })
                }
                const found = filterItems(data.value, search)
                console.log(found);


                if (found) {
                    loading.value = false
                    return found
                }
            }
            break;
        case 'filter':
            if (filter) {
                const found = data.value.filter(c => c.region === filter)


                if (found) {
                    return found
                }
            }
            break;
        default:
            loading.value = false
            return data.value
    }

    //watch([continentFilter, countrySearchInput], () => filtered(countrySearchInput, continentFilter))

}
</script>