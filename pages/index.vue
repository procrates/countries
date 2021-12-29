<template>
    <main class="flex flex-col mx-5">
        <div class="items-center mt-10 desktop:flex desktop:justify-between">
            <MoleculeSearchInput class="flex-grow-0" />
            <MoleculeFilterInput class="flex-grow-0" />
        </div>
        <section class="gap-10 desktop:grid desktop:grid-cols-4 desktop:grid-flow-row-dense">
            <transition-group
                enter-active-class="transition-opacity duration-1000"
                enter-from-class="opazity-0"
                enter-to-class="opacity-100"
            >
                <OrganismCard
                    lazy
                    v-if="list"
                    v-for="(item,index) in list"
                    :key="`${index}-${item.name}`"
                    :item="item"
                    class="opacity-100"
                />
                <div v-else class="mx-auto mt-10">No results...</div>
            </transition-group>
        </section>
    </main>
</template>
<script setup lang="ts">
const { data, refresh } = await useLazyAsyncData('countries', async () => {
    const res = await $fetch('https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital')
    console.log(res.slice(0, 1));
    return res
}
)
const loading = useLoading()
const countrySearchInput = useCountrySearch()
const continentFilter = useContinentFilter()
const filterType = useFilterType()
const list = ref()


onMounted(() => {

    list.value = data.value
    /*     const interval = setInterval(() => {
            if (!items.length) {
                clearInterval(interval)
            } else {
                list.value.push(items.shift())
            }
        }, 500) */
})

watch([countrySearchInput, continentFilter], () => {
    list.value = filtered(countrySearchInput.value, continentFilter.value)
    /* const interval = setInterval(() => {
        if (!items.length) {
            clearInterval(interval)
        } else {
            list.value.push(items.shift())
        }
    }, 100) */

}
)
const filtered = (search, filter) => {
    switch (filterType.value) {
        case 'search':
            if (search === '') return data.value
            if (search) {
                function filterItems(arr, query) {
                    return arr.filter((el) => {
                        return el.name.common.toLowerCase().indexOf(query.toLowerCase()) !== -1
                    })
                }
                const found = filterItems(data.value, search)
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
}
</script>