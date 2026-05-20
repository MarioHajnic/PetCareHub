<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

type Pet = {
  id: number
  name: string
  species: string
  age: string
  health: string
}


const pets = ref<Pet[]>([])

const stored = localStorage.getItem('pets')
if (stored) {
  pets.value = JSON.parse(stored)
}

function addPet() {
  router.push('/pets/add')
}

function goTo(path: string) {
  router.push(path)
}
</script>

<template>
  <div @click="goTo('/')">
    <p>←</p>
  </div>

  <div class="w-full">
    <h1>Moji ljubimci</h1>

    <div v-if="pets.length === 0" class="mt-10 items-center">
      <p>Još nemaš dodanih ljubimaca.</p>
      <button @click="addPet">Dodaj ljubimca</button>
    </div>

    <div v-else class="mt-10">
      <table class="w-full border-collapse">
        <thead>
          <tr class="border-b">
            <th class="text-left p-2">Ime</th>
            <th class="text-left p-2">Vrsta</th>
            <th class="text-left p-2">Dob</th>
            <th class="text-left p-2">Zdravlje</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="p in pets" :key="p.id" class="border-b">
            <td class="p-2">{{ p.name }}</td>
            <td class="p-2">{{ p.species }}</td>
            <td class="p-2">{{ p.age }}</td>
            <td class="p-2">{{ p.health }}</td>
          </tr>
        </tbody>
      </table>

      <button @click="addPet" class="rounded bg-green-500">Dodaj ljubimca</button>
    </div>
  </div>
</template>

<style scoped>
button {
  margin-top: 10px;
}
</style>
