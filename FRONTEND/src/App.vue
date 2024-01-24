<template>
    <div class="dark h-screen flex overflow-hidden bg-black">
      <NavBarView />
      <RouterView class=""/>
</div>
</template>

<script setup>
import NavBarView from '@/views/NavBarView.vue';
</script>
