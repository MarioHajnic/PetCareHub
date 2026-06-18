<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { db, auth } from '@/firebase'
import { collection, getDocs } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'

const router = useRouter()
const pets = ref([])

onMounted(() => {
  onAuthStateChanged(auth, async (user) => {
    if (!user) return

    const q = await getDocs(collection(db, 'pets'))
    const arr = []

    q.forEach(doc => {
      const data = doc.data()
      if (data.userId === user.uid) {
        arr.push({
          id: doc.id,
          name: data.name,
          species: data.species,
          age: data.age,
          health: data.health,
          image: data.image || ''
        })
      }
    })

    pets.value = arr
  })
})

function addPet() {
  router.push('/pets/add')
}

function goTo(path) {
  router.push(path)
}

function editPet(id) {
  router.push(`/pets/edit/${id}`)
}
</script>




<template>
  <div @click="goTo('/')" class="cursor-pointer mb-4">
    <p>←</p>
  </div>

  <h1 class="text-2xl font-bold mb-6">Moji ljubimci</h1>

  <div v-if="pets.length === 0" class="mt-10 text-center">
    <p class="mb-4">Još nemaš dodanih ljubimaca.</p>
    <button @click="addPet" class="bg-green-500 text-white px-4 py-2 rounded">
      Dodaj ljubimca
    </button>
  </div>

  <div v-else class="mt-10">
    <table class="w-full border-collapse">
      <thead>
        <tr class="border-b">
          <th class="text-left p-2">Slika</th>
          <th class="text-left p-2">Ime</th>
          <th class="text-left p-2">Vrsta</th>
          <th class="text-left p-2">Dob</th>
          <th class="text-left p-2">Zdravlje</th>
          <th class="text-left p-2">Akcije</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="p in pets" :key="p.id" class="border-b">
          
          <td class="p-2">
            <img
              v-if="p.image"
              :src="p.image"
              class="w-12 h-12 rounded-full object-cover border"
            />
          </td>

          <td class="p-2">{{ p.name }}</td>
          <td class="p-2">{{ p.species }}</td>
          <td class="p-2">{{ p.age }}</td>
          <td class="p-2">{{ p.health }}</td>

          <td class="p-2">
            <button @click="editPet(p.id)" class="text-blue-600">
              Uredi
            </button>
          </td>

        </tr>
      </tbody>
    </table>

    <button
      @click="addPet"
      class="rounded bg-green-500 text-white px-4 py-2 mt-6"
    >
      Dodaj ljubimca
    </button>
  </div>
</template>

