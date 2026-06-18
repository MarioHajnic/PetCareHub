<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { db } from '@/firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

const route = useRoute()
const router = useRouter()

const petId = route.params.id

const name = ref('')
const species = ref('')
const age = ref('')
const health = ref('')
const imageBase64 = ref('')
const newImageBase64 = ref('')

onMounted(async () => {
  const snap = await getDoc(doc(db, 'pets', petId))
  if (!snap.exists()) return

  const data = snap.data()
  name.value = data.name
  species.value = data.species
  age.value = data.age
  health.value = data.health
  imageBase64.value = data.image || ''
})

function handleNewImage(e) {
  const file = e.target.files[0]
  const reader = new FileReader()

  reader.onload = () => {
    newImageBase64.value = reader.result
  }

  reader.readAsDataURL(file)
}

async function saveChanges() {
  await updateDoc(doc(db, 'pets', petId), {
    name: name.value,
    species: species.value,
    age: age.value,
    health: health.value,
    image: newImageBase64.value || imageBase64.value
  })

  router.push('/pets')
}
</script>



<template>
  <div @click="router.push('/pets')" class="cursor-pointer">←</div>

  <h1>Uredi ljubimca</h1>

  <img v-if="imageBase64" :src="imageBase64" class="w-32 h-32 object-cover rounded" />

  <input type="file" @change="handleNewImage" class="border p-2 rounded w-full" />

  <input v-model="name" class="border p-2 rounded w-full" placeholder="Ime" />
  <input v-model="species" class="border p-2 rounded w-full" placeholder="Vrsta" />
  <input v-model="age" class="border p-2 rounded w-full" placeholder="Dob" />
  <input v-model="health" class="border p-2 rounded w-full" placeholder="Zdravlje" />

  <button @click="saveChanges" class="bg-blue-600 text-white px-4 py-2 rounded">
    Spremi promjene
  </button>
</template>


