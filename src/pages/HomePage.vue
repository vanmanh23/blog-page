<script setup>
import { getBlogs } from '@/api/blogsApi';
import BlogCard from '@/components/BlogCard.vue';
import { Search } from 'lucide-vue-next';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Skeleton from 'primevue/skeleton';
import SearchCard from '@/components/SearchCard.vue';

const data = ref([]);
const dataSearch = ref([]);
const results = ref([]);
const isLoading = ref(false);
const searchInput = ref('');
const page = ref(1); // Trang hiện tại
const hasMore = ref(true); // Kiểm tra còn dữ liệu không
const isFetching = ref(false); // Đang tải dữ liệu thêm

const fetchDataforSearch = async () => {
  try {
    const response = await getBlogs();
    dataSearch.value = response.result;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

const fetchData = async () => {
  if (isFetching.value || !hasMore.value) return;

  isFetching.value = true;
  isLoading.value = true;
  try {
    const response = await getBlogs();
    if (response.result.length > 0 && page.value < 4) {
      data.value = [...data.value, ...response.result];
      page.value += 1;
    } else {
      hasMore.value = false;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    isFetching.value = false;
    isLoading.value = false;
  }
};
const handleScroll = () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 50) {
    fetchData(); // Gọi API khi cuộn đến cuối
  }
};

const filterList = () => {
  if (!searchInput.value) {
    results.value = [];
    return;
  }
  const normalizedSearch = removeVietnameseTones(searchInput.value);
  results.value = dataSearch.value.filter((item) =>
    removeVietnameseTones(item.title).includes(normalizedSearch)
  );
};

function removeVietnameseTones(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();
}

// Gắn và gỡ sự kiện cuộn
onMounted(() => {
  fetchDataforSearch();
  fetchData();
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div class="flex flex-col w-full px-[20px] sm:px-[50px] md:px-[50px] lg:px-[140px] bg-bg_primary pt-9 gap-3">
    <div class="relative mb-3">
      <input v-model="searchInput" type="text" placeholder="Search Blog..." @input="filterList"
        class="w-full py-4 pl-5 rounded-lg bg-white drop-shadow-lg outline-none border dark:text-gray-800 text-gray-800 border-bd_primary" />
      <Search class="absolute top-[30px] right-3 -translate-x-1/2 -translate-y-1/2 " />
      <div class="relative mt-3">
        <div v-if="results.length > 0" class="absolute top-0 right-0 left-0 z-50 min-h-64 bg-bg_primary overflow-y-scroll">
          <div class="absolute flex flex-col top-0 right-0 left-0 p-4 bg-slate-200 gap-3 rounded-md">
            <div v-for="(blog, index) in results" :key="index" class="relative flex flex-col">
              <router-link :to="{ name: 'BlogDetail', params: { id: blog.id } }">
                <SearchCard :img="blog.imageUrl" :title="blog.title" :text="blog.text" />
              </router-link>
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
    <div v-if="isLoading"
      class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 2xl:grid-cols-4 grid-cols-1 justify-center gap-6">
      <div v-for="index in 12" :key="index">
        <div class="flex flex-col gap-2 mb-4">
          <Skeleton height="130px"></Skeleton>
          <Skeleton></Skeleton>
          <Skeleton height="30px" class="mb-2"></Skeleton>
          <Skeleton></Skeleton>
        </div>
      </div>
    </div>
  </div>
</template>
