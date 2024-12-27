<template>
  <div class="flex flex-row justify-between gap-5 md::px-10 xl:px-32 px-3 py-5 bg-bg_primary">
    <div class="flex flex-col gap-5 uppercase bg-bg_primary w-full md:px-5 md:py-5">
      <h3 class="text-primary_25 font-semibold text-xl">Create blog</h3>
      <div class="flex flex-col gap-5">
        <div class="flex flex-col gap-2">
          <label class="text-primary_15">Title</label>
          <input v-model="form.title" type="text"
            class="w-full drop-shadow-lg bg-white rounded-lg outline-none px-1 py-1">
            <p v-if="errors.title" class="text-red-500 text-sm">{{ errors.title }}</p>
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-primary_15">Description</label>
          <textarea v-model="form.text" type="text"
            class="w-full drop-shadow-lg bg-white rounded-lg outline-none px-1 py-1" rows="2" />
          <p v-if="errors.text" class="text-red-500 text-sm">{{ errors.text }}</p>
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-primary_15">Heading</label>
          <input v-model="form.heading" type="text"
            class="w-full drop-shadow-lg bg-white rounded-lg outline-none px-1 py-1">
            <p v-if="errors.heading" class="text-red-500 text-sm">{{ errors.heading }}</p>
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-primary_15">Choose image</label>
          <input @change="handleFileChange" type="file">
          <p v-if="errors.image" class="text-red-500 text-sm">{{ errors.image }}</p>
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-primary_15">Content</label>
          <textarea v-model="form.content" type="text"
            class="w-full drop-shadow-lg bg-white rounded-lg outline-none px-1 py-1" rows="5" />
            <p v-if="errors.content" class="text-red-500 text-sm">{{ errors.content }}</p>
        </div>
        <div class="flex justify-end">
          <button @click="createPost" class="bg-blue-500 text-white px-4 py-2 rounded-lg">
            <img v-if="isLoading" class="w-8 h-8" src="../assets/icons/loading.svg" alt="vk-icon" />
            <p v-else>Create Post</p>
          </button>
        </div>
      </div>
    </div>
    <div class="md:flex hidden flex-col gap-5 px-5 py-5 bg-white w-1/3 h-fit rounded-xl">
      <h3 class="text-primary_25 font-semibold text-xl uppercase text-center">Recent post</h3>
      <div class="flex flex-col gap-2">
        <p class="uppercase text-primary_20">DESIGN PROCESS</p>
        <p>Our 15 favorite websites from August </p>
        <p>The beginners guide to user research</p>
        <p class="uppercase text-primary_20">insparatio</p>
        <p>Web page layout 101: website anatomy every designer needs to learn</p>
        <p class="uppercase text-primary_20">FREELANCING</p>
        <p>10 essential sections to a high landing
          page</p>
      </div>
    </div>
  </div>
  <div>
    <Toast />
  </div>
</template>
<script setup>
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { createBlog } from "@/api/blogsApi";
import { ref } from "vue";
import { useRouter } from 'vue-router';

const router = useRouter();
const isLoading = ref(false);
const form = ref({
  title: "",
  text: "",
  heading: "",
  image: null,
  content: "",
});
const errors = ref({
  title: null,
  text: null,
  heading: null,
  image: null,
  content: null,
});
const toast = useToast();
const validateField = () => {
  errors.value.title = form.value.title.trim() === "" ? "Title is required" : null;
  errors.value.text = form.value.text.trim() === "" ? "Description is required" : null;
  errors.value.heading = form.value.heading.trim() === "" ? "Heading is required" : null;
  errors.value.image = form.value.image === null ? "Image is required" : null;
  errors.value.content = form.value.content.trim() === "" ? "Content is required" : null;

  return Object.values(errors.value).every((error) => error === null);
};
const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    form.value.image = file;
  }
};
const createPost = async () => {
  isLoading.value = true;
  if (!validateField()) {
    isLoading.value = false;
    toast.add({ severity: 'warn', summary: 'Validation Error', detail: 'Please fix the errors', life: 3000 });
    return;
  }
  const formData = new FormData();
  formData.append("title", form.value.title);
  formData.append("text", form.value.text);
  formData.append("heading", form.value.heading);
  formData.append("imageurl", form.value.image);
  formData.append("content", form.value.content);

  try {
    const res = await createBlog(formData);
    if (res === 200) {
      toast.add({ severity: 'success', summary: 'Success', detail: 'Create success', life: 3000 });
      router.push('/');
    } else {
      toast.add({ severity: 'error', summary: 'Error', detail: 'Create fail', life: 3000 });
    }

  } catch (error) {
    console.error("Error creating post:", error);
    toast.add({ severity: 'error', summary: 'Error', detail: 'Create fail', life: 3000 });
  } finally {
    isLoading.value = false;
  }
};
</script>
