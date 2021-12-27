<template>
    <div class="relative w-full desktop:w-64" ref="target">
        <button
            @click="filterToggle = !filterToggle"
            type="button"
            class="relative w-full px-1 py-3 bg-white border rounded-md shadow-lg outline-none cursor-default dark:bg-mode-dark-dark-blue sm:text-sm dark:border-mode-dark-dark-blue dark:focus:border-mode-dark-white focus:border-2 focus:border-mode-dark-dark-blue"
            aria-haspopup="listbox"
            aria-expanded="true"
            aria-labelledby="listbox-label"
        >
            <span
                class="block pl-5 font-light text-left truncate dark:text-mode-dark-white text-mode-light-dark-gray"
            >Filter by region</span>
            <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <!-- Heroicon name: solid/selector -->
                <svg
                    class="w-5 h-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fill-rule="evenodd"
                        d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                    />
                </svg>
            </span>
        </button>

        <ul
            class="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg dark:bg-mode-dark-dark-blue max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            :class="filterToggle === true ? 'block' : 'hidden'"
            tabindex="-1"
            role="listbox"
            aria-labelledby="listbox-label"
            aria-activedescendant="listbox-option-3"
        >
            <li
                v-for="item in continentList"
                class="relative py-2 pl-3 cursor-default select-none pr-9"
                id="listbox-option-0"
                role="option"
            >
                <button @click="setFilter(item)">
                    <span class="block font-normal truncate">{{ item }}</span>
                </button>
            </li>
        </ul>
    </div>
</template>
<script setup lang="ts">
const target = ref(null)
onClickOutside(target, (event) => filterToggle.value = false)
const filterToggle = ref(false)

const continentFilter = useContinentFilter()
const countrySearchQuery = useCountrySearch()
const filterType = useFilterType()

const setFilter = (item) => {
    filterToggle.value = false
    countrySearchQuery.value = ''
    filterType.value = 'filter'
    continentFilter.value = item
}

const continentList = ref([
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania'
])
</script>