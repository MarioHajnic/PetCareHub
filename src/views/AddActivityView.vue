<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const petId = ref('')
const date = ref('')
const description = ref('')

const error = ref('')

const pets = JSON.parse(localStorage.getItem('pets') || '[]')

function saveActivity() {
  if (petId.value == '' || date.value == '' || description.value == '') {
    error.value = 'Ispuni sva polja!'
    return
  }

  const newActivity = {
    id: Date.now(),
    petId: Number(petId.value),
    date: date.value,
    description: description.value
  }

  const activities = JSON.parse(localStorage.getItem('activities') || '[]')
  activities.push(newActivity)
  localStorage.setItem('activities', JSON.stringify(activities))

  router.push('/activities')
}
</script>

<template>
  <div @click="router.push('/activities')">
    <p>←</p>
  </div>

  <h1>Dodaj aktivnost</h1>

  <div class="mt-10 space-y-4 w-full max-w-md">

    <select v-model="petId" class="border p-2 rounded w-full">
      <option value="">Odaberi ljubimca</option>
      <option v-for="p in pets" :key="p.id" :value="p.id">
        {{ p.name }}
      </option>
    </select>

    <input 
      type="date"
      v-model="date"
      class="border p-2 rounded w-full"
    />

    <textarea
      v-model="description"
      class="border p-2 rounded w-full"
      placeholder="Opis aktivnosti"
    ></textarea>

    <p v-if="error" class="text-red-600">{{ error }}</p>

    <button 
      class="bg-[#00798c] text-white px-4 py-2 rounded"
      @click="saveActivity"
    >
      Spremi
    </button>
  </div>
</template>
