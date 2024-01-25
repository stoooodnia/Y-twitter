<template>
  <div class="min-h-screen max-w-screen flex bg-black ">
    <!-- <div class="flex flex-col w-80"></div> -->
    <NavBarView />
    <RouterView />
    <RightBarView/>
  </div>
</template>

<script setup>
import NavBarView from '@/views/NavBarView.vue';
import RightBarView from '@/views/RightBarView.vue';
</script>
