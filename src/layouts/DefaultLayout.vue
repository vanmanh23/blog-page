<template>
    <div class="container">
        <NavbarPage />
        <main>
            <div class="max-w-[1200px] mx-auto">
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

<style>
    .container {
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: flex-start;
        align-content: flex-start;
        align-items: start;
        align-self: flex-start;
    }
</style>