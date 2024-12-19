<template>
    <div class="flex flex-col">
        <NavbarPage />
        <main>
            <div class="content min-w-fit">
                <router-view />
            </div>
        </main>
        <FooterPage />
    </div>
</template>

<script setup>
import NavbarPage from '@/components/NavbarPage.vue';
import FooterPage from '@/components/FooterPage.vue';
</script>
