<script setup>
import { getBlogs } from '@/api/blogsApi';
import BlogCard from '@/components/BlogCard.vue';
import { Search } from 'lucide-vue-next';
import { ref, onMounted } from 'vue';

const data = ref([]);
const fetchData = async () => {
  try {
    const response = await getBlogs();
    data.value = response.result;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
onMounted(() => {
  fetchData();
});
// const items = [
//   {
//     id: 1,
//     img: 'https://cdn.britannica.com/35/238335-050-2CB2EB8A/Lionel-Messi-Argentina-Netherlands-World-Cup-Qatar-2022.jpg',
//     title: 'How to Reinstall WordPress: 5 Different Methods Depending On Your Needs',
//     text: 'User research is the reality check every project needs. Here’s our guide to why you should be doing it — and how to get started.'

//   },
//   {
//     id: 2,
//     img: 'https://cdn.britannica.com/35/238335-050-2CB2EB8A/Lionel-Messi-Argentina-Netherlands-World-Cup-Qatar-2022.jpg',
//     title: 'How to Reinstall WordPress: 5 Different Methods Depending On Your Needs',
//     text: 'User research is the reality check every project needs. Here’s our guide to why you should be doing it — and how to get started.'
//   },
//   {
//     id: 3,
//     img: 'https://cdn.britannica.com/35/238335-050-2CB2EB8A/Lionel-Messi-Argentina-Netherlands-World-Cup-Qatar-2022.jpg',
//     title: 'How to Reinstall WordPress: 5 Different Methods Depending On Your Needs',
//     text: 'User research is the reality check every project needs. Here’s our guide to why you should be doing it — and how to get started.'
//   },
//   {
//     id: 4,
//     img: 'https://cdn.britannica.com/35/238335-050-2CB2EB8A/Lionel-Messi-Argentina-Netherlands-World-Cup-Qatar-2022.jpg',
//     title: 'How to Reinstall WordPress: 5 Different Methods Depending On Your Needs',
//     text: 'User research is the reality check every project needs. Here’s our guide to why you should be doing it — and how to get started.'
//   },
// ]
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
    <div class="grid md:grid-cols-3 sm:grid-cols-2 2xl:grid-cols-4 grid-cols-1 justify-center gap-6">
      <div v-for="(blog, index) in data" :key="index">
        <router-link :to="{ name: 'BlogDetail', params: { id: blog.id } }">
          <BlogCard :img="blog.imageUrl" :title="blog.title" :text="blog.text" />
        </router-link>
      </div>
    </div>
  </div>
</template>
<style></style>
