<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goTo(path: string) {
  router.push(path)
}

</script>

<template>
  <div class="home">

    <div class="flex flex-col space-y-30">
      <div class="w-1/7" @click="goTo('/pets')">
        <div class="text-3xl font-bold m-2 flex space-x-1">
          <p style="color: #00798c">Moji</p><p style="color: #fa7528"> ljubimci</p>
        </div>
        
        <p class="m-2">Pregled i upravljanje ljubimcima</p>
      </div>

      <div class="w-1/7" @click="goTo('/activities')">
        <p class="text-3xl font-bold m-2" style="color: #00798c">Aktivnosti</p>
        <p class="m-2">Unos i uređivanje aktivnosti</p>
      </div>

      <div class="w-1/7" @click="goTo('/history')">
        <div class="text-3xl font-bold m-2 flex space-x-1">
          <p style="color: #00798c">Pregled</p><p style="color: #fa7528">povijesti</p>
        </div>
        
        <p class="m-2">Prikaz svih prošlih aktivnosti</p>
      </div>
    </div>
  </div>
</template>
