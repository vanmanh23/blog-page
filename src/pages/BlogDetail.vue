<template>
    <!-- <div>{{ $route.params.id }}</div> -->
     <div class="flex flex-col gap-5 md:px-[200px] px-5">
        <div class="flex flex-col md:gap-5 gap-2">
            <h2 class="text-primary_15 md:text-[24px] text-[18px] font-bold"> Reasons to Build Your Website with WP Page Builder</h2>
            <p class="text-black md:text-[12px] text-[12px]">People’s quest for creating websites has easily taken us to a new era of site development. Where, with the availability of robust page building tools, creating websites has become a lot more fun (especially for non-developers).</p>
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
                <h2 class="text-primary_25 md:text-[18px] text-[14px] font-semibold">What’s Special About WP Page Builder?</h2>
                <p  class="text-primary_20 text-[14px]">Wondering what makes WP Page Builder so special? I would say, what doesn’t? It’s developed by the team over at Themeum, who has been creating WordPress themes since 2013. As mentioned above, the plugin is a full pack of essential site building elements with all modern the modern functionality you’ve come to expect from a page builder plugin. Let’s have a look below at all of the juicy features WP Page Builder includes.</p>
                <img src="https://ichef.bbci.co.uk/ace/standard/1024/cpsprodpb/4550/live/3ebc72e0-7320-11ef-ba9a-01dc5b04cf6a.jpg" alt="ms">
                <p class="text-primary_20 text-[14px]">	•	Form: Create web forms effortlessly. It gives you a convenient way to style your forms as you desire. The Form add-on itself is capable of setting up any kind of form without needing to install any plugin. Moreover, you can manage form plugins and enable reCAPTCHA with just a simple click. There is also an add-on for Contact Form 7 if you prefer.</p>
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
</template>

<script setup>
import { Heart, Eye } from 'lucide-vue-next';
</script>