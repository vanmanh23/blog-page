<template>
     <div v-if="!isLoading" class="flex flex-col gap-5 md:px-[200px] px-5">
        <div class="flex flex-col md:gap-5 gap-2">
            <h2 class="text-primary_15 md:text-[24px] text-[18px] font-bold">{{ BlogData.title }}</h2>
            <p class="text-black md:text-[12px] text-[12px]">{{ BlogData.text }}</p>
        </div>
        <div class="flex flex-row md:gap-6 gap-1 md:mt-10 mt-3">
            <div class="w-1/12">
                <ul class="flex flex-col gap-2 w-full">
                    <li class="w-12"><img src="../assets/icons/pinterest.svg" alt="pinterest-icon" /></li>
                    <li><img src="../assets/icons/instargram.svg" alt="instargram-icon" /></li>
                    <li><img src="../assets/icons/twitter.svg" alt="twitter-icon" /></li>
                    <li><img src="../assets/icons/facebook.svg" alt="facebook-icon" /></li>
                </ul>
            </div>
            <div class="flex flex-col gap-3">
                <h2 class="text-primary_25 md:text-[18px] text-[14px] font-semibold">{{ BlogData.heading }}</h2>
                <p  class="text-slate-600 text-[14px]">{{ BlogData.content }}</p>
                <img :src="BlogData.imageUrl" :alt="BlogData.imageUrl">
                <!-- <p class="text-primary_20 text-[14px]">{{ BlogData.content }}</p> -->
            </div>
            <div class="flex flex-col gap-3 w-1/12">
                <div class="flex flex-col items-center">
                    <Heart class="md:w-5 w-3"/>
                    <p class="text-[12px]">11k</p>
                </div>
                <div class="flex flex-col items-center">
                    <Eye class="md:w-5 w-3"/>
                    <p class="text-[12px]">12k</p>
                </div>
            </div>
        </div>
     </div>
     <div v-if="isLoading" class="flex flex-col w-full px-[20px] md:px-[150px] bg-bg_primary pt-9 gap-3 overflow-x-scroll">
    <div class="flex flex-col gap-4 mb-4">
      <Skeleton height="60px" class=""></Skeleton>
      <Skeleton height="30px" class=""></Skeleton>
      <Skeleton height="300px" width="90%" class="m-auto"></Skeleton>
      <Skeleton height="30px"></Skeleton>
      <Skeleton height="30px"></Skeleton>
    </div>
  </div>
</template>

<script setup>
import Skeleton from 'primevue/skeleton';
import { getBlogById } from '@/api/blogsApi';
import { Heart, Eye } from 'lucide-vue-next';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const BlogData = ref([]);
const isLoading = ref(false);
const route = useRoute();
const paramsId = route.params.id;
const fetchData = async () => {
  isLoading.value = true;
  try {
    const res = await getBlogById(paramsId);
    BlogData.value = res;
    console.log(BlogData.value);
  } catch (error) {
    console.error("Error fetching blog:", error);
    throw error;
  } finally {
    isLoading.value = false;
  }
}
onMounted(() => {
  fetchData();
});
</script>
