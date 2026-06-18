<script setup>
import { ref, onMounted } from 'vue'
import { db, auth } from '@/firebase'
import { collection, getDocs } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'



const activities = ref([])
const pets = ref([])
const today = new Date().toISOString().split('T')[0]

onMounted(async () => {
  const petsSnap = await getDocs(collection(db, 'pets'))
  const petsArr = []
  petsSnap.forEach(doc => {
    const data = doc.data()
    if (data.userId === auth.currentUser.uid) {
      petsArr.push({ id: doc.id, ...data })
    }
  })
  pets.value = petsArr

  const actSnap = await getDocs(collection(db, 'activities'))
  const arr = []
  actSnap.forEach(doc => {
    const data = doc.data()
    if (data.userId === auth.currentUser.uid && data.date < today) {
      arr.push({ id: doc.id, ...data })
    }
  })
  activities.value = arr
})

function petName(id) {
  const p = pets.value.find(x => x.id === id)
  return p ? p.name : 'Nepoznato'
}
</script>

<template>
  <h1>Pregled povijesti</h1>

  <table v-if="activities.length" class="w-full border border-gray-400 border-collapse">
    <thead>
      <tr class="border-b border-gray-400">
        <th class="p-2 text-left">Ljubimac</th>
        <th class="p-2 text-left">Datum</th>
        <th class="p-2 text-left">Opis</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="a in activities" :key="a.id" class="border-b border-gray-300">
        <td class="p-2">{{ petName(a.petId) }}</td>
        <td class="p-2">{{ a.date }}</td>
        <td class="p-2">{{ a.description }}</td>
      </tr>
    </tbody>
  </table>

  <p v-else>Još nema prošlih aktivnosti.</p>
</template>
