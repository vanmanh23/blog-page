<template>
  <div class="flex flex-col gap-5">
    <div class="relative w-full h-[200px] overflow-hidden">
      <img :src="img" :alt="img" class="w-full h-full object-cover rounded-md" />
    </div>
    <div class="flex flex-col gap-2">
      <p class="md:text-[12px] sm:text-[15px] text-[11px] uppercase"><span class="text-primary_20">by</span> TOMAS
        LAURINAVICIUS <span class="text-primary_20">in</span> DESIGN PROCESS</p>
      <h2 class="md:text-[16px] sm:text-[20px] text-[16px] font-semibold  overflow-hidden text-ellipsis whitespace-normal break-words line-clamp-2">{{ title
        }}</h2>
      <p
        class="md:text-[10px] sm:text-[13px] text-[10px] text-primary_20 overflow-hidden text-ellipsis whitespace-normal break-words line-clamp-2">
        {{ text }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  img: String,
  title: String,
  text: String
})
</script>
