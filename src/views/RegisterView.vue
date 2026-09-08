<script setup>
import { ref } from 'vue'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '@/firebase'
import { useRouter } from 'vue-router'
import { collection, addDoc } from 'firebase/firestore'

const name = ref('')
const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

async function register() {
  error.value = ''

  if (!name.value || !email.value || !password.value) {
    error.value = 'Ispunite sva polja'
    return
  }

  try {
    const userCred = await createUserWithEmailAndPassword(auth, email.value, password.value)

    await addDoc(collection(db, 'users'), {
      uid: userCred.user.uid,
      name: name.value
    })

    router.push('/login')
  } catch (e) {
    error.value = 'Greška pri registraciji'
  }
}
</script>

<template>
  <div class="max-w-md space-y-4">
    <h1 class="text-2xl font-bold">Registracija</h1>

    <input v-model="name" type="text" placeholder="Ime" class="border p-2 rounded w-full" />
    <input v-model="email" type="email" placeholder="Email" class="border p-2 rounded w-full" />
    <input v-model="password" type="password" placeholder="Lozinka" class="border p-2 rounded w-full" />

    <button @click="register" class="bg-[#00798c] text-white px-4 py-2 rounded w-full">
      Registriraj se
    </button>

    <p v-if="error" class="text-red-600">{{ error }}</p>
  </div>
</template>
