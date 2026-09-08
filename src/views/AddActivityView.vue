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
const tip = ref('')
const description = ref('')
const error = ref('')
let currentUser = null

const vrste = [
  'Hranjenje',
  'Šetnja',
  'Veterinarski pregled',
  'Igra',
  'Ostalo'
]

onMounted(() => {
  onAuthStateChanged(auth, async (user) => {
    if (!user) return
    currentUser = user

    const docs = await getDocs(collection(db, 'pets'))
    const list = []

    const all = docs.docs
    for (let i = 0; i < all.length; i++) {
      const item = all[i]
      const d = item.data()

      if (d.userId === user.uid) {
        list.push({
          id: item.id,
          name: d.name
        })
      }
    }

    pets.value = list
  })
})

async function saveActivity() {
  if (!petId.value || !date.value || !tip.value) {
    error.value = 'Ispunite obavezna polja!'
    return
  }

  if (!currentUser) {
    error.value = 'Korisnik nije učitan.'
    return
  }

  await addDoc(collection(db, 'activities'), {
    petId: petId.value,
    date: date.value,
    tip: tip.value,
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

  <h1 style="color: #fa7528">Dodaj aktivnost</h1>

  <div class="mt-10 space-y-4 w-full max-w-md" style="color: #00798c">

    <select v-model="petId" class="border p-2 rounded w-full">
      <option value="">Odaberi ljubimca</option>
      <option v-for="p in pets" :key="p.id" :value="p.id">
        {{ p.name }}
      </option>
    </select>

    <select v-model="tip" class="border p-2 rounded w-full">
      <option value="">Vrsta aktivnosti</option>
      <option v-for="v in vrste" :key="v" :value="v">
        {{ v }}
      </option>
    </select>

    <input
      style="color: #fa7528"
      v-model="date"
      type="date"
      class="border p-2 rounded w-full"
    />

    <textarea
      style="color: #00798c"
      v-model="description"
      class="border p-2 rounded w-full"
      placeholder="Opis (nije obavezno)"
    ></textarea>

    <p v-if="error" class="text-red-600">{{ error }}</p>

    <button
      @click="saveActivity"
      class="bg-[#00798c] text-white px-4 py-2 rounded"
    >
      Spremi
    </button>
  </div>
</template>
