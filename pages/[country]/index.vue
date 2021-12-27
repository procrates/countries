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
                :src="item[0].flags?.svg"
                :alt="`${item[0].name} flag`"
                class="object-cover w-full h-full mt-10 desktop:w-1/2"
            />
            <div class="desktop:ml-20">
                <h1 class="my-5 text-2xl font-semibold">{{ item[0].name }}</h1>
                <dl class="flex flex-col space-y-3">
                    <div class="desktop:flex">
                        <div>
                            <div class="flex space-x-1">
                                <dt class="font-semibold">Native name:</dt>
                                <dd class="text-mode-light-dark-gray">{{ item[0]?.nativeName }}</dd>
                            </div>

                            <div class="flex space-x-1">
                                <dt class="font-semibold">Population:</dt>
                                <dd
                                    class="text-mode-light-dark-gray"
                                >{{ formatNumber(item[0].population) }}</dd>
                            </div>
                            <div class="flex space-x-1">
                                <dt class="font-semibold">Region:</dt>
                                <dd class="text-mode-light-dark-gray">{{ item[0]?.region }}</dd>
                            </div>
                            <div class="flex space-x-1">
                                <dt class="font-semibold">Sub region:</dt>
                                <dd class="text-mode-light-dark-gray">{{ item[0].subregion }}</dd>
                            </div>
                            <div class="flex space-x-1">
                                <dt class="font-semibold">Capital:</dt>
                                <dd class="text-mode-light-dark-gray" v-if="item[0].capital">
                                    <ul class="flex">
                                        <li v-for="cap in item[0].capital">{{ cap }}</li>
                                    </ul>
                                </dd>
                                <dd class="text-mode-light-dark-gray" v-else>No capital...</dd>
                            </div>
                        </div>
                        <div class="flex flex-col ml-10 space-y-3">
                            <div class="flex space-x-1">
                                <dt class="font-semibold">Top level domain:</dt>
                                <dd
                                    class="text-mode-light-dark-gray"
                                >{{ item[0].topLevelDomain[0] }}</dd>
                            </div>
                            <div class="flex space-x-1">
                                <dt class="font-semibold">Currencies:</dt>
                                <dd class="text-mode-light-dark-gray">
                                    <ul>
                                        <li v-for="cur in item[0].currencies">{{ cur.name }}</li>
                                    </ul>
                                </dd>
                            </div>
                            <div class="flex space-x-1">
                                <dt class="font-semibold">Languages:</dt>
                                <dd class="text-mode-light-dark-gray">
                                    <ul class="flex">
                                        <li
                                            v-for="(lang,key,index) in item[0].languages"
                                            class="mr-1"
                                        >{{ lang.name }}</li>
                                    </ul>
                                </dd>
                            </div>
                        </div>
                    </div>
                    <div class="flex space-y-3">
                        <div class="flex flex-col mt-10">
                            <dt class="font-semibold">Borders:</dt>
                            <dd class="text-mode-light-dark-gray">
                                <ul class="flex flex-row flex-wrap">
                                    <li
                                        v-for="country in borderCountries"
                                        class="px-5 py-2 mt-3 mr-4 rounded-md shadow-sm dark:shadow-mode-light-dark-gray shadow-mode-dark-dark-blue dark:bg-mode-dark-dark-blue"
                                    >
                                        <NuxtLink
                                            :to="country?.name"
                                            class="w-full h-full"
                                        >{{ country?.name }}</NuxtLink>
                                    </li>
                                </ul>
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
const { data: item, refresh } = await useFetch(`https://restcountries.com/v2/name/${country}?fields=name,flags,nativeName,population,region,subregion,capital,topLevelDomain,currencies,languages,borders`)

console.log(item.value[0].borders);
const borders = item.value[0].borders.toString()
console.log(borders);

const { data: borderCountries } = await useFetch(`https://restcountries.com/v2/alpha?codes=${borders}`)
console.log(borderCountries.value);

const formatNumber = (number) => new Intl.NumberFormat().format(number)

</script>