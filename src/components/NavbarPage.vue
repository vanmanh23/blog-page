<template>
  <header class="relative flex flex-row justify-between w-full h-[70px] items-center px-5 md:px-[100px]">
    <router-link :to="{ name: 'home' }" class="inline-flex items-center h-full text-orange-500 font-bold">
      <img src="../assets/icons/logo.svg" alt="logo" />
    </router-link>
    <div class="md:flex hidden items-center gap-2 md:gap-[76px]">
      <router-link
        class="inline-flex items-center  h-full transition-colors hover:bg-orange-500 hover:text-white text-primary_10">
        New
      </router-link>
      <router-link :to="{ name: 'ListBlogs' }" class="inline-flex items-center  h-full transition-colors hover:bg-orange-500 hover:text-white">
        Reading list
      </router-link>
      <router-link class="inline-flex items-center h-full transition-colors hover:bg-orange-500 hover:text-white">
        Topics
      </router-link>
      <router-link :to="{ name: 'CreateBlog' }">
        <ButtonDefault title="Create" />
      </router-link>
    </div>
    <div class="md:hidden flex ">
      <button class="lg:hidden focus:outline-none" @click="toggleMenu">
        <span v-if="!isMenuOpen">
          <AlignJustify />
        </span>
        <span v-else>✖</span>
      </button>
    </div>
    <nav v-show="isMenuOpen"
      class="absolute flex flex-col top-full z-10 left-0 w-full text-black bg-white mt-0 space-y-2 text-center py-2 transition-all">
      <router-link class=" transition-colors hover:bg-orange-500 hover:text-white text-primary_10">
        New
      </router-link>
      <router-link :to="{ name: 'ListBlogs' }" class="transition-colors hover:bg-orange-500 hover:text-white">
        Reading list
      </router-link>
      <router-link class="transition-colors hover:bg-orange-500 hover:text-white">
        Topics
      </router-link>
      <router-link :to="{ name: 'CreateBlog' }">
        <ButtonDefault title="Create" />
      </router-link>
    </nav>

  </header>
</template>
<script setup>
import { AlignJustify } from 'lucide-vue-next';
import { ref } from "vue";
import ButtonDefault from './ButtonDefault.vue';
const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>
