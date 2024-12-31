<template>
  <div v-if="!isLoading" class="flex flex-col w-full px-[20px] md:px-[150px] bg-bg_primary pt-9 gap-2 overflow-hidden">
    <DataTable v-model:filters="filters" :value="data" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
      :globalFilterFields="['title', 'text', 'heading']">
      <!--  -->
      <template #header>
        <div class="relative flex justify-end">
          <input v-model="filters['title'].value" placeholder="Search by name"
            class="border border-bd_primary outline-none shadow-lg p-2 rounded-lg" />
          <div class="absolute top-1/2 right-1 -translate-x-1/2 -translate-y-1/2">
            <Search />
          </div>
        </div>
      </template>
      <template #empty> No blog found. </template>
      <template #loading> Loading blog data. Please wait. </template>
      <!--  -->
      <Column field="title" header="Name" style="width: 25%">
        <template #body="{ data }">
          <div class="max-h-[50px] max-w-10 sm:max-w-full md:max-w-full lg:max-w-full xl:max-w-full overflow-hidden text-ellipsis whitespace-normal break-words line-clamp-2">
            {{ data.title }}
          </div>
        </template>
      </Column>
      <Column field="text" header="Text" style="width: 25%">
        <template #body="{ data }">
          <div class="max-h-[50px] max-w-10 sm:max-w-full md:max-w-full lg:max-w-full xl:max-w-full overflow-hidden text-ellipsis whitespace-normal break-words line-clamp-2">
            {{ data.text }}
          </div>
        </template>
      </Column>
      <Column field="heading" header="Heading" style="width: 25%"
        class="hidden lg:table-cell xl:table-cell md:table-cell">
        <template #body="{ data }">
          <div class="max-h-[50px] overflow-hidden text-ellipsis whitespace-normal break-words line-clamp-2">
            {{ data.heading }}
          </div>
        </template>
      </Column>
      <Column field="content" header="Content" style="width: 25%"
        class="hidden lg:table-cell xl:table-cell md:table-cell">
        <template #body="{ data }">
          <div class="max-h-[50px] overflow-hidden text-ellipsis whitespace-normal break-words line-clamp-2">
            {{ data.content }}
          </div>
        </template>
      </Column>
      <Column filterField="content" header="Delete" class="max-h-12" style="width: 20%">
        <template #body="{ data }">
          <button @click="deleteItem(data.id)" class="text-red-500 flex justify-center items-center text-center w-full">
            <Trash2 class="" />
          </button>
        </template>
      </Column>
      <Column field="content" header="Edit" style="width: 20%">
        <template #body="{ data }">
          <button @click="handleEdit(data)" class="text-blue-500 flex justify-center items-center">
            <FilePenLine />
          </button>
        </template>
      </Column>
    </DataTable>
  </div>
  <!--  -->
  <div>
    <Dialog v-model:visible="visible" modal header="Edit Blog" :style="{ width: '50vw' }" class='bg-slate-600'
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <!-- <form @submit.prevent="updateBlog"> -->
      <div class="flex items-center gap-4 mb-4">
        <label for="title" class="font-semibold w-24">Title</label>
        <input id="title" v-model="selectedItem.title"
          class="flex-auto outline-none border border-bd_primary p-1 rounded-md shadow-md" autocomplete="off" />
      </div>
      <div class="flex items-center gap-4 mb-8">
        <label for="text" class="font-semibold w-24">Description</label>
        <input id="text" v-model="selectedItem.text"
          class="flex-auto outline-none border border-bd_primary p-1 rounded-md shadow-md" autocomplete="off" />
      </div>
      <div class="flex items-center gap-4 mb-8">
        <label for="heading" class="font-semibold w-24">Heading</label>
        <input id="heading" v-model="selectedItem.heading"
          class="flex-auto outline-none border border-bd_primary p-1 rounded-md shadow-md" autocomplete="off" />
      </div>
      <div class="flex items-center gap-4 mb-8">
        <label for="content" class="font-semibold w-24">Content</label>
        <textarea id="content" v-model="selectedItem.content"
          class="flex-auto outline-none border border-bd_primary p-1 rounded-md shadow-md" autocomplete="off"
          rows="5" />
      </div>
      <div class="flex items-center gap-4 mb-8">
        <label class="text-primary_15">Choose image</label>
        <input @change="handleFileChange" type="file">
      </div>
      <div class="flex justify-end gap-2">
        <button @click="visible = false" class="bg-red-500 text-white px-4 py-2 rounded-lg">
          Cancel
        </button>
        <button type="submit" @click="updateBlog" class="bg-blue-500 text-white p-2 rounded">
        <p v-if="!isUploading">Update Blog</p>
        <img v-if="isUploading" class="w-8 h-8" src="../assets/icons/loading.svg" alt="loading" />
        </button>
      </div>
      <!-- </form> -->
    </Dialog>
  </div>
  <!--  -->
  <div v-if="isLoading" class="flex flex-col w-full px-[20px] md:px-[150px] bg-bg_primary pt-9 gap-3 overflow-x-scroll">
    <div class="flex flex-col gap-4 mb-4">
      <Skeleton height="60px" class=""></Skeleton>
      <Skeleton height="30px" class=""></Skeleton>
      <Skeleton height="30px" class=""></Skeleton>
      <Skeleton height="30px"></Skeleton>
      <Skeleton height="30px"></Skeleton>
      <Skeleton height="20px"></Skeleton>
      <Skeleton height="20px"></Skeleton>
    </div>
  </div>
  <!--  -->
  <div>
    <Toast />
  </div>
</template>
<script setup>
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

import Skeleton from 'primevue/skeleton';
import DataTable from 'primevue/datatable';
import Dialog from 'primevue/dialog';
import Column from 'primevue/column';
import { ref, onMounted } from 'vue';
import { deleteBlogById, getBlogs, updateBlogById } from '@/api/blogsApi';
import { Trash2 } from 'lucide-vue-next';
import { FilePenLine } from 'lucide-vue-next';
import { FilterMatchMode } from '@primevue/core/api';
import { Search } from 'lucide-vue-next';

const data = ref([]);
const visible = ref(false);
const isLoading = ref(false);
const isUploading = ref(false);

const selectedItem = ref({
  title: '',
  text: '',
  heading: '',
  content: '',
});

const selectedFile = ref(null);


const toast = useToast();

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
//
const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
  }
}
//
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  title: { value: null, matchMode: FilterMatchMode.CONTAINS },
  text: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  heading: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
});
//
const deleteItem = async (itemid) => {
  const res = await deleteBlogById(itemid);
  if (res === 200) {
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'delete success',
      life: 3000,
    })
    fetchData();
    if (res !== 200) {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'delete fail',
        life: 3000,
      })
    }
    console.log("Delete item:", itemid);
  }
};
function handleEdit(data) {
  selectedItem.value = { ...data };
  visible.value = true;
  console.log(selectedItem.value.imageUrl);
}

async function updateBlog() {
  isUploading.value = true;
  try {
    const form = new FormData();
    form.append('title', selectedItem.value.title);
    form.append('text', selectedItem.value.text);
    form.append('heading', selectedItem.value.heading);
    form.append('content', selectedItem.value.content);
    if (selectedFile.value) {
      form.append('imageurl', selectedFile.value);
    }
    const response = await updateBlogById(selectedItem.value.id, form);
    if (response === 200) {
      toast.add({ severity: 'success', summary: 'Success', detail: 'update success', life: 3000 });
      visible.value = false;
      fetchData();
    }
  } catch (error) {
    console.error('Error:', error);
    toast.add({ severity: 'error', summary: 'Error', detail: error, life: 3000 });
    throw error;
  } finally {
    isUploading.value = false;
  }
}
//
onMounted(() => {
  fetchData();
});
</script>
