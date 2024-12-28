<script setup>
import { getBlogs } from '@/api/blogsApi';
import BlogCard from '@/components/BlogCard.vue';
import { Search } from 'lucide-vue-next';
import { ref, onMounted } from 'vue';
import Skeleton from 'primevue/skeleton';
import SearchCard from '@/components/SearchCard.vue';

const data = ref([]);
const results = ref([]);
const isLoading = ref(false);
const searchInput = ref('');
const fetchData = async () => {
  isLoading.value = true;
  try {
    const response = await getBlogs();
    data.value = response.result;
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    isLoading.value = false;
  }
};
const filterList = () => {
  if (!searchInput.value) {
    console.log("Search input is empty!");
    results.value = [];
    return;
  }
  const resultsSearch = data.value.filter((item) => item.title.toLowerCase().includes(searchInput.value.toLowerCase()));
  results.value = resultsSearch;
}

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="flex flex-col w-full px-[20px] sm:px-[50px] md:px-[50px] lg:px-[140px] bg-bg_primary pt-9 gap-3">
    <div class="relative mb-3">
      <input v-model="searchInput" type="text" placeholder="Search Blog..." @input="filterList"
        class="w-full py-4 pl-5 rounded-lg bg-white drop-shadow-lg outline-none " />
        <Search class="absolute top-[30px] right-3 -translate-x-1/2 -translate-y-1/2 " />
      <div class="relative mt-3">
        <div v-if="results.length > 0" class="relative min-h-96 overflow-y-scroll">
          <div
          class="absolute flex flex-col top-0 right-0 left-0 p-4 bg-slate-200 gap-3 rounded-md">
          <div v-for="(blog, index) in results" :key="index" class="relative flex flex-col">
            <SearchCard :img="blog.imageUrl" :title="blog.title" :text="blog.text" />
          </div>
        </div>
        </div>
        <div v-if="results.length === 0 && searchInput"
          class="absolute flex flex-col top-0 right-0 left-0 p-4 gap-3 rounded-md">
          <div class="w-full z-50 text-4xl font-semibold uppercase flex justify-center border border-bd_primary bg-white rounded-md p-4 shadow-2xl drop-shadow-xl">
            <p>do not found</p>
          </div>
        </div>
      </div>
    </div>
    <div>
      <h3 class="text-[12px] text-primary_20 uppercase">All Post</h3>
    </div>
    <div v-if="!isLoading"
      class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 2xl:grid-cols-4 grid-cols-1 justify-center gap-6">
      <div v-for="(blog, index) in data" :key="index">
        <router-link :to="{ name: 'BlogDetail', params: { id: blog.id } }">
          <BlogCard :img="blog.imageUrl" :title="blog.title" :text="blog.text" />
        </router-link>
      </div>
    </div>
    <!--  -->
    <div v-if="isLoading"
      class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 2xl:grid-cols-4 grid-cols-1 justify-center gap-6">
      <div v-for="index in 12" :key="index" class="">
        <div class="flex flex-col gap-2 mb-4">
          <Skeleton height="130px" class=""></Skeleton>
          <Skeleton class=""></Skeleton>
          <Skeleton height="30px" class="mb-2"></Skeleton>
          <Skeleton></Skeleton>
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>
