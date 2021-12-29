<template>
    <NuxtLink
        :to="`/${item.name.common.toLowerCase().split(' ').join('-')}`"
        class="flex flex-col mt-5 rounded-lg shadow-xl desktop:justify-between desktop:h-full desktop:mt-auto bg-neutral-white"
    >
        <div class="rounded-t-lg desktop:h-full desktop:overflow-hidden">
            <img
                :src="item.flags.svg"
                :alt="`${item.name} flag`"
                class="block object-fill w-full align-top rounded-t-lg min-h-fit"
            />
        </div>
        <div class="px-5 py-8">
            <h1 class="mb-5 text-2xl font-semibold">{{ item.name.common }}</h1>
            <dl>
                <div class="flex space-x-1">
                    <dt class="font-semibold">Population:</dt>
                    <dd>{{ formatNumber(item.population) }}</dd>
                </div>
                <div class="flex space-x-1">
                    <dt class="font-semibold">Region:</dt>
                    <dd>{{ item.region }}</dd>
                </div>
                <div class="flex space-x-1">
                    <dt class="font-semibold">Capital:</dt>
                    <dd v-if="item.capital[0]">{{ item.capital[0] }}</dd>
                    <dd v-else>No capital...</dd>
                </div>
            </dl>
        </div>
    </NuxtLink>
</template>
<script setup lang="ts">
defineProps({
    item: {
        type: Object
    }
})

const formatNumber = (number) => new Intl.NumberFormat().format(number)
</script>