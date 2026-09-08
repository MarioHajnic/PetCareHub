<template>
  <div>
    <header class="flex items-center justify-center bg-white p-4">

      <h1 class="text-3xl font-bold" style="color:#00798c">
        PetCare
      </h1>

      <img src="@/assets/logo.png" alt="Pet Care Hub logo" class="h-16" />

      <h1 class="text-3xl font-bold" style="color:#fa7528">
        Hub
      </h1>

    </header>

    <RouterView />
  </div>
</template>

<style scoped>
header {
  position: sticky;
  top: 0;
  z-index: 50;
}
</style>