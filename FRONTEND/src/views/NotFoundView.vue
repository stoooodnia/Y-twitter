<template>
    <div class="bg-black h-screen w-full flex flex-col items-center justify-center">
        <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="h-32 w-32 mb-8 text-white"
    >
      <path d="M18 6 L12 12 L6 6"></path>
      <path d="M12 12 L12 18"></path>
    </svg>
        <div class="text-center">
            <h1 class="text-7xl font-bold text-gray-800">404</h1>
            <p class="text-xl text-gray-600">It appears that this page might not exist</p>
            <router-link to="/wall" class="mt-4 inline-block px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Go back</router-link>
        </div>
    </div>
</template>

