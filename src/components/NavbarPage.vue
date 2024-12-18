<template>
    <header class="flex flex-row justify-between w-full pt-[50px] px-[100px]">
        <router-link :to="{ name: 'home' }" class="inline-flex items-center h-full px-5 text-orange-500 font-bold">
            <img src="../assets/icons/logo.svg" alt="logo" />
        </router-link>
        <div class="flex items-center gap-[76px]">
            <router-link 
                class="inline-flex items-center px-2 h-full transition-colors hover:bg-orange-500 hover:text-white">
                New
            </router-link>
            <router-link 
                class="inline-flex items-center px-2 h-full transition-colors hover:bg-orange-500 hover:text-white">
                Reading list
            </router-link>
            <router-link 
                class="inline-flex items-center px-2 h-full transition-colors hover:bg-orange-500 hover:text-white">
                Topics
            </router-link>
        </div>
    </header>
</template>
<script setup>
</script>