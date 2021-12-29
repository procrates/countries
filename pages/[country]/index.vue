<template>
    <main v-if="item" class="pb-10 mx-5">
        <div class="mt-10">
            <NuxtLink
                to="/"
                class="inline-flex items-center px-8 py-2 font-light rounded-md shadow-md text-mode-light-dark-gray dark:bg-mode-dark-dark-blue"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="inline-block w-5 h-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fill-rule="evenodd"
                        d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                        clip-rule="evenodd"
                    />
                </svg>Back
            </NuxtLink>
        </div>
        <div class="desktop:flex desktop:items-center">
            <img
                :src="item.flags.svg"
                :alt="`${item.name.common} flag`"
                class="object-cover w-full h-full mt-10 desktop:w-1/2"
            />
            <div class="desktop:ml-20">
                <h1 class="my-5 text-2xl font-semibold">{{ item.name.common }}</h1>
                <dl class="flex flex-col space-y-3">
                    <div class="desktop:flex">
                        <div>
                            <div class="flex space-x-1">
                                <dt class="font-semibold">Native name:</dt>
                                <dd class="text-mode-light-dark-gray">
                                    <ul>
                                        <li v-for="item in item.name.native">{{ item.official }}</li>
                                    </ul>
                                </dd>
                            </div>

                            <div class="flex space-x-1">
                                <dt class="font-semibold">Population:</dt>
                                <dd
                                    class="text-mode-light-dark-gray"
                                >{{ formatNumber(item.population) }}</dd>
                            </div>
                            <div class="flex space-x-1">
                                <dt class="font-semibold">Region:</dt>
                                <dd class="text-mode-light-dark-gray">{{ item.region }}</dd>
                            </div>
                            <div class="flex space-x-1">
                                <dt class="font-semibold">Sub region:</dt>
                                <dd class="text-mode-light-dark-gray">{{ item.subregion }}</dd>
                            </div>
                            <div class="flex space-x-1">
                                <dt class="font-semibold">Capital:</dt>
                                <dd class="text-mode-light-dark-gray" v-if="item.capitals">
                                    <ul class="flex">
                                        <li v-for="cap in item.capitals">{{ cap }}</li>
                                    </ul>
                                </dd>
                                <dd class="text-mode-light-dark-gray" v-else>No capital...</dd>
                            </div>
                        </div>
                        <div class="flex flex-col ml-10 space-y-3">
                            <div class="flex space-x-1">
                                <dt class="font-semibold">Top level domain:</dt>
                                <dd class="text-mode-light-dark-gray">{{ item.tld[0] }}</dd>
                            </div>
                            <div class="flex space-x-1">
                                <dt class="font-semibold">Currencies:</dt>
                                <dd class="text-mode-light-dark-gray">
                                    <ul>
                                        <li v-for="(curr, index) in item.currencies" :key="index">
                                            <ul>
                                                <li
                                                    v-for="item in curr"
                                                >{{ item.name }} ({{ item.symbol }})</li>
                                            </ul>
                                        </li>
                                    </ul>
                                </dd>
                            </div>
                            <div class="flex space-x-1">
                                <dt class="font-semibold">Languages:</dt>
                                <dd class="text-mode-light-dark-gray">
                                    <ul class="flex">
                                        <li v-for="(lang,key,index) in item.languages" class="mr-1">
                                            <ul>
                                                <li v-for="item in lang">{{ item }}</li>
                                            </ul>
                                        </li>
                                    </ul>
                                </dd>
                            </div>
                        </div>
                    </div>
                    <div class="flex space-y-3">
                        <div class="flex flex-col mt-10">
                            <dt class="font-semibold">Borders:</dt>
                            <dd class="text-mode-light-dark-gray">
                                <ul class="flex flex-row flex-wrap" v-if="borderCountries">
                                    <li
                                        v-for="country in borderCountries"
                                        class="px-5 py-2 mt-3 mr-4 rounded-md shadow-sm dark:shadow-mode-light-dark-gray shadow-mode-dark-dark-blue dark:bg-mode-dark-dark-blue"
                                    >
                                        <NuxtLink
                                            :to="country?.name.common.toLowerCase()"
                                            class="w-full h-full"
                                        >{{ country?.name.common }}</NuxtLink>
                                    </li>
                                </ul>
                                <div v-else>No border countries</div>
                            </dd>
                        </div>
                    </div>
                </dl>
            </div>
        </div>
    </main>
</template>
<script setup lang="ts">
const route = useRoute()
const country = route.params.country.split('-').join(' ')

const { data: item, refresh } = await useAsyncData('country', async () => {

    const res = await $fetch(`https://restcountries.com/v3.1/name/${country}?fields=name,flags,nativeName,population,region,subregion,capital,tld,currencies,languages,borders`)
    const item = res[0]
    console.log('format', [item.languages]);
    const formatted = {
        name: {
            common: item.name.common,
            official: item.name.official,
            native: item.name.nativeName
        },
        capitals: [
            ...item.capital
        ],
        population: item.population,
        region: item.region,
        subregion: item.subregion,
        borders: item.borders,
        languages: [
            item.languages
        ],
        currencies: [
            item.currencies
        ],
        tld: item.tld,
        flags: {
            ...item.flags
        }
    }


    console.log('format', formatted);

    return formatted
})

const borders = item.value.borders.toString()
const { data: borderCountries } = await useFetch(`https://restcountries.com/v3.1/alpha?codes=${borders}`)
const formatNumber = (number) => new Intl.NumberFormat().format(number)
</script>