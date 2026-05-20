<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

type Pet = {
  id: number
  name: string
}

type Activity = {
  id: number
  petId: number
  date: string
  description: string
}

const pets = JSON.parse(localStorage.getItem('pets') || '[]') as Pet[]
const activities = ref<Activity[]>(JSON.parse(localStorage.getItem('activities') || '[]'))

const odabraniPet = ref('')

function addActivity() {
  router.push('/activities/add')
}

function goTo(path: string) {
  router.push(path)
}

function petName(id: number) {
  const p = pets.find(x => x.id === id)
  if (p) {
    return p.name
  } else {
    return 'Nepoznato'
  }
}


</script>

<template>
  <div @click="goTo('/')">
    <p>←</p>
  </div>

  <h1>Aktivnosti</h1>

  <div style="margin-top: 20px;">
    <select v-model="odabraniPet">
      <option value="">Prikaži sve</option>
      <option v-for="p in pets" :key="p.id" :value="p.id">
        {{ p.name }}
      </option>
    </select>

    <button @click="addActivity" style="margin-left: 10px;" class="rounded bg-green-500">
      Dodaj aktivnost
    </button>
  </div>

  <div class="mt-8">
    <table 
      v-if="activities.length > 0"
      class="w-full border border-gray-400 border-collapse"
    >
      <thead>
        <tr class="border-b border-gray-400">
          <th class="p-2 text-left">Ljubimac</th>
          <th class="p-2 text-left">Datum</th>
          <th class="p-2 text-left">Opis</th>
        </tr>
      </thead>

      <tbody>
        <tr 
          v-for="a in activities.filter(x => !odabraniPet || x.petId == Number(odabraniPet))"
          :key="a.id"
          class="border-b border-gray-300"
        >
          <td class="p-2">{{ petName(a.petId) }}</td>
          <td class="p-2">{{ a.date }}</td>
          <td class="p-2">{{ a.description }}</td>
        </tr>
      </tbody>
    </table>

    <p v-else>Još nemaš dodanih aktivnosti.</p>
  </div>
</template>
