<template>
  <div class="flex flex-col w-full px-[20px] md:px-[150px] bg-bg_primary pt-9 gap-3 overflow-x-scroll">
    <DataTable :value="data" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
    <Column field="title" header="Name" style="width: 25%"></Column>
    <Column field="text" header="Text" style="width: 25%"></Column>
    <Column field="heading" header="Heading" style="width: 25%"></Column>
    <Column field="content" header="Content" style="width: 25%"></Column>
    <Column filterField="content" header="Delete" style="width: 25%">
      <template #body="{ data }">
        <button @click="deleteItem(data)" class="text-red-500 flex justify-center items-center text-center w-full"> <Trash2 class=""/></button>
    </template>
    </Column>
    <Column field="content" header="Edit" style="width: 25%">
      <template #body="{ data }">
        <button @click="editItem(data)" class="text-blue-500 flex justify-center items-center"><FilePenLine /></button>
      </template>
    </Column>
    </DataTable>
  </div>
</template>
<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { ref, onMounted } from 'vue';
import { deleteBlogById, getBlogs } from '@/api/blogsApi';
import { Trash2 } from 'lucide-vue-next';
import { FilePenLine } from 'lucide-vue-next';

const data = ref([]);
const fetchData = async () => {
  try {
    const response = await getBlogs();
    data.value = response.result;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const deleteItem = async (itemid) => {
  const res = await deleteBlogById('5');
  if (res === 200) {
    console.log("Delete item:", itemid);
  }
};

// Hàm xử lý nút Edit
const editItem = (item) => {
  console.log("Edit item:", item);
  // Xử lý chỉnh sửa item ở đây
};

onMounted(() => {
  fetchData();
});
</script>
