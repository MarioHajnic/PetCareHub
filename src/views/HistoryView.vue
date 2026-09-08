<script setup>
import { ref, onMounted } from 'vue'
import { db, auth } from '@/firebase'
import { collection, getDocs } from 'firebase/firestore'
import { useRouter } from 'vue-router'

const router = useRouter()

const activities = ref([])
const pets = ref([])

const danas = new Date()

let m = danas.getMonth() + 1
let day = danas.getDate()

if (m < 10) m = '0' + m
if (day < 10) day = '0' + day

const today = danas.getFullYear() + '-' + m + '-' + day

onMounted(async () => {
  const petsSnap = await getDocs(collection(db, 'pets'))
  const petsList = []

  const allPets = petsSnap.docs
  for (let i = 0; i < allPets.length; i++) {
    const item = allPets[i]
    const d = item.data()

    if (d.userId === auth.currentUser.uid) {
      petsList.push({
        id: item.id,
        name: d.name
      })
    }
  }

  pets.value = petsList

  const actSnap = await getDocs(collection(db, 'activities'))
  const actList = []

  const allActs = actSnap.docs
  for (let i = 0; i < allActs.length; i++) {
    const item = allActs[i]
    const d = item.data()

    if (d.userId === auth.currentUser.uid && d.date < today) {
      actList.push({
        id: item.id,
        petId: d.petId,
        tip: d.tip,
        date: d.date,
        description: d.description
      })
    }
  }

  activities.value = actList
})

function petName(id) {
  const p = pets.value.find(x => x.id === id)
  return p ? p.name : 'Nepoznato'
}

function goTo(path) {
  router.push(path)
}
</script>

<template>
  <div @click="goTo('/')" class="cursor-pointer mb-4">
    <p>←</p>
  </div>

  <h1>Pregled povijesti</h1>
  <h1>Ovdje su prikazane sve prošle aktivnosti za vaše ljubimce</h1>

  <table v-if="activities.length" class="w-full border border-gray-400 border-collapse mt-6">
    <thead>
      <tr class="border-b border-gray-400">
        <th class="p-2 text-left">Ljubimac</th>
        <th class="p-2 text-left">Tip</th>
        <th class="p-2 text-left">Datum</th>
        <th class="p-2 text-left">Opis</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="a in activities" :key="a.id" class="border-b border-gray-300">
        <td class="p-2">{{ petName(a.petId) }}</td>
        <td class="p-2">{{ a.tip }}</td>
        <td class="p-2">{{ a.date }}</td>
        <td class="p-2">{{ a.description }}</td>
      </tr>
    </tbody>
  </table>

  <p v-else>Još nema prošlih aktivnosti.</p>
</template>
