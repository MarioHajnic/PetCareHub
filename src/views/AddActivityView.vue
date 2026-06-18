<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { db, auth } from '@/firebase'
import { collection, addDoc, getDocs } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'

const router = useRouter()

const pets = ref([])
const petId = ref('')
const date = ref('')
const description = ref('')
const error = ref('')
let currentUser = null

onMounted(() => {
  onAuthStateChanged(auth, async (user) => {
    if (!user) return
    currentUser = user

    const q = await getDocs(collection(db, 'pets'))
    const arr = []

    q.forEach(doc => {
      const data = doc.data()
      if (data.userId === user.uid) {
        arr.push({ id: doc.id, ...data })
      }
    })

    pets.value = arr
  })
})

async function saveActivity() {
  if (!petId.value || !date.value || !description.value) {
    error.value = 'Ispunite sva polja!'
    return
  }

  if (!currentUser) {
    error.value = 'Korisnik nije učitan.'
    return
  }

  await addDoc(collection(db, 'activities'), {
    petId: petId.value,
    date: date.value,
    description: description.value,
    userId: currentUser.uid
  })

  router.push('/activities')
}
</script>




<template>
  <div class="cursor-pointer" @click="router.push('/activities')">
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

    <input v-model="date" type="date" class="border p-2 rounded w-full" />
    <textarea v-model="description" class="border p-2 rounded w-full" placeholder="Opis"></textarea>

    <p v-if="error" class="text-red-600">{{ error }}</p>

    <button @click="saveActivity" class="bg-[#00798c] text-white px-4 py-2 rounded">
      Spremi
    </button>
  </div>
</template>
