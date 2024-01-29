<template>
  <div
    class="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 sm:px-8 lg:px-16"
  >
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
    class="h-32 w-32 mb-8"
  >
    <path d="M18 6 L12 12 L6 6"></path>
    <path d="M12 12 L12 18"></path>
  </svg>
    <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-center">
      Happening now
    </h1>
    <h2 class="text-xl sm:text-2xl lg:text-3xl mb-8 text-center">
      Join today
    </h2>
  
    <a
      href="/register"
      class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-blue-600 text-white w-full sm:w-3/4 lg:w-1/2 xl:w-1/3"
    >
      Create account
  </a>
    <p class="text-gray-500 text-sm mt-4 mb-8 text-center">
      By signing up, you agree to the Terms of Service, Privacy Policy, including Cookie Use
    </p>
    <div class="border-t border-gray-700 pt-4 w-full sm:w-3/4 lg:w-1/2 xl:w-1/3">
      <p class="text-sm mb-4 text-center">Already have an account?</p>
      <a href="/login"
        class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-transparent border border-white text-white w-full"
      >
        Log in
    </a>
    </div>
    <footer
      class="absolute bottom-0 w-full text-gray-500 text-sm py-4 px-4 sm:px-8 lg:px-16"
    >
      <div class="text-center"><span>© 2024 Y Corp.</span></div>
    </footer>
  </div>
  
  </template>