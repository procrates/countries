<template>
  <div
    class="min-h-screen transition-colors duration-150 bg-stone-50 dark:bg-mode-dark-very-dark-blue dark:text-mode-dark-white font-nunito-sanse"
  >
    <header
      class="flex justify-between px-5 py-8 shadow-lg bg-slate-50 dark:bg-mode-dark-dark-blue"
    >
      <NuxtLink to="/" class="font-bold">Where in the world?</NuxtLink>
      <button @click="darkToggle" class="flex items-center" aria-label="Toggle color">
        <svg
          v-show="moonSun"
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5 transition-opacity duration-200"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
        <svg
          v-show="!moonSun"
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5 transition-opacity duration-200"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </header>
    <NuxtPage />
    <footer class="mt-20">
      <MoleculeAttribution />
    </footer>
  </div>
</template>
<script lang="ts" setup>
import './assets/css/tailwind.css'
useMeta({
  title: "Countries",
  htmlAttrs: {
    lang: 'en'
  },
  meta: [
    {
      name: "description",
      content: "View, search and filter the worlds countries."
    }
  ]
})
const moonSun = ref(true)
const darkToggle = () => {
  localStorage.theme = localStorage.theme === 'dark' ? 'light' : 'dark'
  if (localStorage.theme === 'dark') {
    document.documentElement.classList.add('dark')
    moonSun.value = true
  } else {
    document.documentElement.classList.remove('dark')
    moonSun.value = false
  }
}
onBeforeMount(() => {
  // On page load or when changing themes, best to add inline in `head` to avoid FOUC
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    localStorage.theme = 'dark'
    moonSun.value = true
    document.documentElement.classList.add('dark')
  } else {
    moonSun.value = false
    localStorage.theme = 'light'
    document.documentElement.classList.remove('dark')
  }


})
</script>