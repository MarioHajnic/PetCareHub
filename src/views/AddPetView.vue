<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const name = ref('')
const species = ref('')
const age = ref('')
const health = ref('')

const error = ref('')

function savePet() {
  if (name.value == '' || species.value == '' || age.value == '' || health.value == '') {
    error.value = 'Ispunite sva polja!'
    return
  }

  const newPet = {
    id: Date.now(),
    name: name.value,
    species: species.value,
    age: age.value,
    health: health.value
  }

  const pets = JSON.parse(localStorage.getItem('pets') || '[]')

  pets.push(newPet)

  localStorage.setItem('pets', JSON.stringify(pets))

  router.push('/pets')
}
</script>

<template>
  <div class="cursor-pointer" @click="router.push('/pets')">
    <p>←</p>
  </div>

  <h1>Dodaj ljubimca</h1>

  <div class="mt-10 space-y-4 w-full max-w-md">

    <input 
      v-model="name"
      class="border p-2 rounded w-full"
      placeholder="Ime ljubimca"
    />

    <input 
      v-model="species"
      class="border p-2 rounded w-full"
      placeholder="Vrsta (npr. pas, mačka)"
    />

    <input 
      v-model="age"
      class="border p-2 rounded w-full"
      placeholder="Dob"
    />

    <textarea
      v-model="health"
      class="border p-2 rounded w-full"
      placeholder="Zdravstveno stanje"
    ></textarea>

    <p v-if="error" class="text-red-600">{{ error }}</p>

    <button 
      class="bg-[#00798c] text-white px-4 py-2 rounded"
      @click="savePet"
    >
      Spremi
    </button>
  </div>
</template>
