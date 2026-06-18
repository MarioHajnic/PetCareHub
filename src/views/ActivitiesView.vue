<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { db, auth } from '@/firebase'
import { collection, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'

const router = useRouter()

const pets = ref([])
const activities = ref([])
const odabraniPet = ref('')
const editingId = ref(null)
const editDate = ref('')
const editOpis = ref('')

onMounted(() => {
  onAuthStateChanged(auth, async (user) => {
    if (!user) return

    const petsSnap = await getDocs(collection(db, 'pets'))
    const petsArr = []
    petsSnap.forEach(d => {
      const data = d.data()
      if (data.userId === user.uid) {
        petsArr.push({ id: d.id, ...data })
      }
    })
    pets.value = petsArr

    const actSnap = await getDocs(collection(db, 'activities'))
    const actArr = []
    actSnap.forEach(d => {
      const data = d.data()
      if (data.userId === user.uid) {
        actArr.push({ id: d.id, ...data })
      }
    })
    activities.value = actArr
  })
})

function petName(id) {
  const p = pets.value.find(x => x.id === id)
  return p ? p.name : 'Nepoznato'
}

function startEdit(a) {
  editingId.value = a.id
  editDate.value = a.date
  editOpis.value = a.description
}

async function saveEdit(id) {
  const a = activities.value.find(x => x.id === id)
  if (!a) return

  await updateDoc(doc(db, 'activities', id), {
    date: editDate.value,
    description: editOpis.value
  })

  a.date = editDate.value
  a.description = editOpis.value
  editingId.value = null
}

async function deleteActivity(id) {
  await deleteDoc(doc(db, 'activities', id))
  activities.value = activities.value.filter(x => x.id !== id)
}

function addActivity() {
  router.push('/activities/add')
}

function goTo(path) {
  router.push(path)
}
</script>


<template>
  <div @click="goTo('/')">
    <p>←</p>
  </div>

  <h1>Aktivnosti</h1>

  <div class="mt-5">
    <select v-model="odabraniPet">
      <option value="">Prikaži sve</option>
      <option v-for="p in pets" :key="p.id" :value="p.id">{{ p.name }}</option>
    </select>

    <button @click="addActivity" class="ml-2 rounded bg-green-500 text-white px-3 py-1">
      Dodaj aktivnost
    </button>
  </div>

  <div class="mt-8">
    <table v-if="activities.length" class="w-full border border-gray-400 border-collapse">
      <thead>
        <tr class="border-b border-gray-400">
          <th class="p-2 text-left">Ljubimac</th>
          <th class="p-2 text-left">Datum</th>
          <th class="p-2 text-left">Opis</th>
          <th class="p-2 text-left">Akcija</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="a in activities.filter(x => !odabraniPet || x.petId === odabraniPet)"
          :key="a.id"
          class="border-b border-gray-300"
        >
          <td class="p-2">{{ petName(a.petId) }}</td>

          <td class="p-2">
            <div v-if="editingId !== a.id">
              <span @dblclick="startEdit(a)">{{ a.date }}</span>
            </div>
            <div v-else>
              <input v-model="editDate" class="border p-1" />
            </div>
          </td>

          <td class="p-2">
            <div v-if="editingId !== a.id">
              <span @dblclick="startEdit(a)">{{ a.description }}</span>
            </div>
            <div v-else>
              <input v-model="editOpis" class="border p-1" />
            </div>
          </td>

          <td class="p-2">
            <button v-if="editingId !== a.id" @click="startEdit(a)" class="text-blue-600">Uredi</button>
            <button v-else @click="saveEdit(a.id)" class="text-green-600">Spremi</button>
            <button @click="deleteActivity(a.id)" class="text-red-600 ml-2">Izbriši</button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else>Još nemaš dodanih aktivnosti.</p>
  </div>
</template>
