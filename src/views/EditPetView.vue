<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { db, auth } from '@/firebase'
import { doc, getDoc, getDocs, updateDoc, deleteDoc, collection } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'



const route = useRoute()
const router = useRouter()

const pet = ref(null)
const activities = ref([])
const potvrda = ref(false)

const editName = ref('')
const editSpecies = ref('')
const editAge = ref('')
const editHealth = ref('')

onMounted(() => {
  onAuthStateChanged(auth, async (user) => {
    if (!user) return

    const id = route.params.id

    const petRef = doc(db, 'pets', id)
    const petSnap = await getDoc(petRef)

    if (petSnap.exists()) {
      const d = petSnap.data()
      pet.value = {
        id: petSnap.id,
        name: d.name,
        species: d.species,
        age: d.age,
        health: d.health,
        image: d.image || '',
        userId: d.userId
      }

      editName.value = d.name
      editSpecies.value = d.species
      editAge.value = d.age
      editHealth.value = d.health
    }

    const docs = await getDocs(collection(db, 'activities'))
    const list = []
    const all = docs.docs

    for (let i = 0; i < all.length; i++) {
      const item = all[i]
      const d = item.data()

      if (d.petId === id && d.userId === user.uid) {
        list.push({
          id: item.id,
          date: d.date,
          description: d.description
        })
      }
    }

    activities.value = list
  })
})

function savePet() {
  updateDoc(doc(db, 'pets', pet.value.id), {
    name: editName.value,
    species: editSpecies.value,
    age: editAge.value,
    health: editHealth.value
  })

  pet.value.name = editName.value
  pet.value.species = editSpecies.value
  pet.value.age = editAge.value
  pet.value.health = editHealth.value
}

function brisanje() {
  potvrda.value = true
}

function odustanioddelete() {
  potvrda.value = false
}

async function deletePet() {
  await deleteDoc(doc(db, 'pets', pet.value.id))
  router.push('/pets')
}

function goBack() {
  router.push('/pets')
}
</script>



<template>
  <div @click="goBack" class="cursor-pointer mb-4">
    ← Natrag
  </div>

  <div v-if="pet">
    <img v-if="pet.image" :src="pet.image" class="w-32 h-32 rounded-full object-cover mb-4" />

    <h1 class="text-2xl font-bold mb-4" style="color: #00798c">{{ pet.name }}</h1>

    <div class="mb-4">
      <label style="color: #fa7528">Ime:</label>
      <input style="color: #fa7528" v-model="editName" class="border p-1 ml-2" />
    </div>

    <div class="mb-4">
      <label style="color: #00798c">Vrsta:</label>
      <input style="color: #00798c" v-model="editSpecies" class="border p-1 ml-2" />
    </div>

    <div class="mb-4">
      <label style="color: #fa7528">Dob:</label>
      <input  style="color: #fa7528" v-model="editAge" class="border p-1 ml-2" />
    </div>

    <div class="mb-4">
      <label style="color: #00798c">Zdravlje:</label>
      <input style="color: #00798c" v-model="editHealth" class="border p-1 ml-2" />
    </div>

    <button @click="savePet" class="bg-blue-500 text-white px-3 py-1 rounded mr-2">
      Spremi promjene
    </button>

    <button @click="brisanje" class="bg-red-500 text-white px-3 py-1 rounded">
      Izbrišii ljubimca
    </button>

    <div v-if="potvrda" class="mt-4 p-4 border rounded bg-gray-100">
      <p>Jesi li siguran da želiš izbrisati ljubimca?</p>
      <button @click="deletePet" class="bg-red-600 text-white px-3 py-1 rounded mr-2">
        Da, izbriši
      </button>
      <button @click="odustanioddelete" class="bg-gray-400 text-white px-3 py-1 rounded">
        Odustani
      </button>
    </div>

    <h2 class="text-xl font-bold mt-6" style="color: #fa7528">Aktivnosti</h2>

    <div v-if="activities.length === 0" class="mt-2">
      <p style="color: #00798c">Još nemaš aktivnosti za ovog ljubimca.</p>
    </div>

    <ul v-else class="mt-2">
      <li v-for="a in activities" :key="a.id" class="border-b py-2">
        <b>{{ a.date }}</b> — {{ a.description }}
      </li>
    </ul>
  </div>
</template>



