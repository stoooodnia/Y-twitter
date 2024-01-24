<template>
  <div class="min-h-screen flex bg-black ">
    <!-- <div class="flex flex-col w-80"></div> -->
    <NavBarView/>
    <RouterView/>
  </div>
</template>

<script setup>
import NavBarView from '@/views/NavBarView.vue';
</script>
