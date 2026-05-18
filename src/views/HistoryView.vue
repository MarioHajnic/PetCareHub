<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()


function goTo(path: string) {
  router.push(path)
}

</script>

<template>

    <div @click="goTo('/')">
        <p>←</p>
    </div>

  <div class="w-full">
    <h1>Povijest aktivnosti</h1>

    <div class="mt-10 items-center">
      <p>Još nema aktivnosti za tvoje ljubimce.</p>
    </div>
  </div>
</template>

<style scoped>


</style>
