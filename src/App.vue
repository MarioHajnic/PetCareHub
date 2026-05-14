<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>


<template>

<header class=" bg-gray-300 p-4 items-center font-bold text-6xl">
  <div class=" display: flex  align-items: center  gap: 12px w-full bg-green">
    <img src="@/assets/logo.png" alt="Logo" class="w-17 h-17 m-2" />
    <h1 class="m-2">
        <div class="items-center flex">
            <p style="color: #00798c">Pet Ca</p><p style="color: #fa7528">re Hub</p>
        </div>    
    </h1>
  </div>

</header>


  <main class="p-8">
    <RouterView />
  </main>
</template>

<style>



</style>
