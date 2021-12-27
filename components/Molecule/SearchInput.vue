<template>
    <div class="my-5 desktop:w-80">
        <div class="relative rounded-md shadow-lg">
            <div
                class="absolute inset-y-0 left-0 flex items-center pl-3 rounded-l-lg pointer-events-none"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </div>
            <input
                type="text"
                name="search"
                id="search"
                autocomplete="off"
                v-model="countrySearchQuery"
                @focusin="toggleFilterType"
                class="block w-full py-3 border-2 rounded-md outline-none dark:bg-mode-dark-dark-blue pl-14 sm:text-sm dark:border-mode-dark-dark-blue dark:focus:border-mode-dark-white focus:border-2 focus:border-mode-dark-dark-blue"
                placeholder="Search country"
            />
        </div>
    </div>
</template>
<script setup lang="ts">
const coninentFilter = useContinentFilter()
const countrySearchQuery = useCountrySearch()
const filterType = useFilterType()
const loading = useLoading()
const toggleFilterType = () => {
    console.log('focus');
    loading.value = false
    coninentFilter.value = ''
    filterType.value = 'search'
}
</script>