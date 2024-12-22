<template>
    <div class="flex flex-row justify-between gap-5 md::px-10 xl:px-32 px-3 py-5 bg-bg_primary">
        <div class="flex flex-col gap-5 uppercase bg-bg_primary w-full md:px-5 md:py-5">
            <h3 class="text-primary_25 font-semibold text-xl">Create blog</h3>
            <div class="flex flex-col gap-5">
                <div class="flex flex-col gap-2">
                    <label class="text-primary_15">Title</label>
                    <input v-model="form.title" type="text" class="w-full drop-shadow-lg bg-white rounded-lg outline-none px-1 py-1">
                </div>
                <div class="flex flex-col gap-2">
                    <label class="text-primary_15">Text</label>
                    <textarea v-model="form.text" type="text" class="w-full drop-shadow-lg bg-white rounded-lg outline-none px-1 py-1" rows="2" />
                </div>
                <div class="flex flex-col gap-2">
                    <label class="text-primary_15">Heading</label>
                    <input v-model="form.heading" type="text" class="w-full drop-shadow-lg bg-white rounded-lg outline-none px-1 py-1">
                </div>
                <div class="flex flex-col gap-2">
                    <label class="text-primary_15">Choose image</label>
                    <input @change="handleFileChange" type="file">
                </div>
                <div class="flex flex-col gap-2">
                    <label class="text-primary_15">Content</label>
                    <textarea v-model="form.content" type="text" class="w-full drop-shadow-lg bg-white rounded-lg outline-none px-1 py-1" rows="5" />
                </div>
                <div class="flex justify-end">
                    <!-- <ButtonDefault title="Create Post" /> -->
                     <button @click="createPost" class="bg-blue-500 text-white px-4 py-2 rounded-lg">
                        Create Post
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
</template>

<script setup>
import { ref } from "vue";
// import ButtonDefault from "@/components/ButtonDefault.vue";

// State form
const form = ref({
  title: "",
  text: "",
  heading: "",
  image: null,
  content: "",
});

// Xử lý file ảnh
const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    form.value.image = file;
    form.value.imageUrl = `http://localhost:5173/images/${file.name}`;
  }
};

// Tạo post
const createPost = () => {
  console.log("Form Data:", form.value);

  // Tạo FormData để gửi tới backend
  const formData = new FormData();
  formData.append("title", form.value.title);
  formData.append("text", form.value.text);
  formData.append("heading", form.value.heading);
  formData.append("image", form.value.image);
  formData.append("content", form.value.content);

  // Gửi formData tới server bằng fetch hoặc Axios
  console.log("Sending to server:", formData);
};
</script>

