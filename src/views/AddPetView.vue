<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { db, auth } from '@/firebase'
import { collection, addDoc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'

const router = useRouter()

const name = ref('')
const species = ref('')
const age = ref('')
const health = ref('')
const imageBase64 = ref('')
const error = ref('')
let currentUser = null

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (!user) return
    currentUser = user
  })
})

function handleImage(e) {
  const file = e.target.files[0]
  const reader = new FileReader()

  reader.onload = () => {
    imageBase64.value = reader.result
  }

  reader.readAsDataURL(file)
}

async function savePet() {
  if (!name.value || !species.value || !age.value || !health.value) {
    error.value = 'Ispunite sva polja!'
    return
  }

  await addDoc(collection(db, 'pets'), {
    name: name.value,
    species: species.value,
    age: age.value,
    health: health.value,
    image: imageBase64.value,
    userId: currentUser.uid
  })

  router.push('/pets')
}
</script>



<template>
  <div class="cursor-pointer" @click="router.push('/pets')">
    <p>←</p>
  </div>

  <h1>Dodaj ljubimca</h1>

  <div class="mt-10 space-y-4 w-full max-w-md">
    <input v-model="name" class="border p-2 rounded w-full" placeholder="Ime" />
    <input v-model="species" class="border p-2 rounded w-full" placeholder="Vrsta" />
    <input v-model="age" class="border p-2 rounded w-full" placeholder="Dob" />
    <input v-model="health" class="border p-2 rounded w-full" placeholder="Zdravlje" />

    <p v-if="error" class="text-red-600">{{ error }}</p>

    <button @click="savePet" class="bg-green-600 text-white px-4 py-2 rounded">
      Spremi
    </button>
  </div>

  <input type="file" @change="handleImage" class="border p-2 rounded w-full" />

    <img v-if="imageBase64" :src="imageBase64" class="w-32 h-32 object-cover rounded" />


</template>

