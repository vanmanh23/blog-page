<script setup>
import { getBlogs } from '@/api/blogsApi';
import BlogCard from '@/components/BlogCard.vue';
import { Search } from 'lucide-vue-next';
import { ref, onMounted } from 'vue';
import Skeleton from 'primevue/skeleton';

const data = ref([]);
const isLoading = ref(false);

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
onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="flex flex-col w-full px-[20px] md:px-[150px] bg-bg_primary pt-9 gap-3">
    <div class="relative mb-3">
      <input v-model="message" placeholder="Type something…"
        class="w-full py-4 pl-5 rounded-lg bg-white drop-shadow-lg outline-none " />
      <Search class="absolute top-1/2 right-3 -translate-x-1/2 -translate-y-1/2 " />
    </div>
    <div>
      <h3 class="text-[12px] text-primary_20 uppercase">All Post</h3>
    </div>
    <div v-if="!isLoading" class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 2xl:grid-cols-4 grid-cols-1 justify-center gap-6">
      <div v-for="(blog, index) in data" :key="index">
        <router-link :to="{ name: 'BlogDetail', params: { id: blog.id } }">
          <BlogCard :img="blog.imageUrl" :title="blog.title" :text="blog.text" />
        </router-link>
      </div>
      </div>
      <!--  -->
      <div v-if="isLoading" class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 2xl:grid-cols-4 grid-cols-1 justify-center gap-6">
        <div v-for="index in 12" :key="index" class="">
          <div class="flex flex-col gap-2 mb-4">
            <Skeleton height="130px" class=""></Skeleton>
            <Skeleton class=""></Skeleton>
            <Skeleton height="30px" class="mb-2"></Skeleton>
            <Skeleton ></Skeleton>
          </div>
        </div>
      </div>
  </div>
</template>
<style></style>
