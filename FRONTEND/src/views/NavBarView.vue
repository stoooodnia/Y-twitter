<template>   
      <div class="flex flex-col w-64 sticky top-0 h-screen">
        <div class="flex items-center justify-center mt-6 ">
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
            class="h-10 w-auto text-white"
            >
            <path d="M18 6 L12 12 L6 6"></path>
            <path d="M12 12 L12 18"></path>
            </svg>
        </div>
        <nav class="mt-10 px-2 space-y-1">
          <RouterLink
            to="/home"
            :class="{ 'bg-gray-900 text-white': page === 'home', 'text-gray-300 hover:text-white hover:bg-gray-700': page !== 'home'}"
            class=" flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-white "
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
              class="mr-4 h-6 w-6 text-gray-300 bg-transparent"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            Home
          </RouterLink>
  
          <RouterLink
            to="/home"
            :class="{ 'bg-gray-900 text-white': page === 'hom', 'text-gray-300 hover:text-white hover:bg-gray-700': page !== 'hom'}"
            class="flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md "
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
              class="mr-4 h-6 w-6 text-gray-400 hover:text-gray-300  bg-transparent"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
            
          </RouterLink>
  
          <RouterLink
            to="/register"
            :class="{ 'bg-gray-900 text-white': page === 'register', 'text-gray-300 hover:text-white hover:bg-gray-700': page !== 'register'}"
            class=" flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md "          >
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
              class="mr-4 h-6 w-6 text-gray-400 -hover:text-gray-300  bg-transparent"
            >
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
            </svg>
            Register
          </RouterLink>
  
          <RouterLink
            to="/login"
            :class="{ 'bg-gray-900 text-white': page === 'login', 'text-gray-300 hover:text-white hover:bg-gray-700': page !== 'login'}"
            class=" flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md "          >
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
              class="mr-4 h-6 w-6 text-gray-400 -hover:text-gray-300  bg-transparent"
            >
              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </svg>
            Login
          </RouterLink>
  
          <RouterLink
            to="/home"
            :class="{ 'bg-gray-900 text-white': page === 'hoe', 'text-gray-300 hover:text-white hover:bg-gray-700': page !== 'ome'}"
            class=" flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md "          >
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
          class="mr-4 h-6 w-6 text-gray-400 -hover:text-gray-300  bg-transparent"
        >
          <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
        </svg>
            -
          </RouterLink>
  
          <RouterLink
            to="/home"
            :class="{ 'bg-gray-900 text-white': page === 'hme', 'text-gray-300 hover:text-white hover:bg-gray-700': page !== 'hme'}"
            class=" flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md "          >
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
              class="mr-4 h-6 w-6 text-gray-400 -hover:text-gray-300  bg-transparent"
            >
              <line x1="8" x2="21" y1="6" y2="6"></line>
              <line x1="8" x2="21" y1="12" y2="12"></line>
              <line x1="8" x2="21" y1="18" y2="18"></line>
              <line x1="3" x2="3.01" y1="6" y2="6"></line>
              <line x1="3" x2="3.01" y1="12" y2="12"></line>
              <line x1="3" x2="3.01" y1="18" y2="18"></line>
            </svg>
            -
          </RouterLink>
  
          <RouterLink
            to="/profile"
            :class="{ 'bg-gray-900 text-white': page === 'profile', 'text-gray-300 hover:text-white hover:bg-gray-700': page !== 'profile'}"
            class=" flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md "          >
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
              class="mr-4 h-6 w-6 text-gray-400 -hover:text-gray-300 bg-transparent"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            Profile
          </RouterLink>
  
          <RouterLink
            to="/home"
            :class="{ 'bg-gray-900 text-white': page === 'hoe', 'text-gray-300 hover:text-white hover:bg-gray-700': page !== 'hme'}"
            class=" flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md "          >
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
              class="mr-4 h-6 w-6 text-gray-400 -hover:text-gray-300 bg-transparent"
            >
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="19" cy="12" r="1"></circle>
              <circle cx="5" cy="12" r="1"></circle>
            </svg>
            -
          </RouterLink>
        </nav>
      </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        page: "",
      }
    }, 
    watch: {
      $route() {
        this.page = this.$route.name;
        console.log(this.page);
      }
    }
  }
  
  </script>
  