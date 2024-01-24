<template>
    <div class="dark h-screen flex overflow-hidden bg-black">
      <NavBarView />
      <RouterView class="w-screen"/>
</div>
</template>

<script setup>
import NavBarView from '@/views/NavBarView.vue';
</script>
