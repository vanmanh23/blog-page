<template>
    <div class="flex flex-col gap-5">
        <div>
            <img :src="img" :alt="img" class="rounded-md"/>
        </div>
        <div>
            <p class="md:text-[12px] sm:text-[15px] text-[11px] uppercase"><span class="text-primary_20">by</span> TOMAS LAURINAVICIUS <span class="text-primary_20">in</span> DESIGN PROCESS</p>
            <h2 class="md:text-[16px] sm:text-[20px] text-[16px] font-semibold md:h-[65px] sm:h-[100px] h-[70px] overflow-hidden">{{ title }}</h2>
            <p class="md:text-[10px] sm:text-[13px] text-[10px] text-primary_20">{{ text }}</p>
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