<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function addPet() {
  router.push('/pets/add')
}

function goTo(path: string) {
  router.push(path)
}

</script>

<template>

    <div class="card" @click="goTo('/')">
        <p>←</p>
    </div>

  <div class="w-full">
    <h1>Moji ljubimci</h1>

    <div class="mt-10 items-center">
      <p>Još nemaš dodanih ljubimaca.</p>
      <button @click="addPet">Dodaj ljubimca</button>
    </div>
  </div>
</template>

<style scoped>

button {
  margin-top: 10px;
}
</style>
