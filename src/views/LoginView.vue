<script setup>
import { ref } from 'vue'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase'
import { useRouter } from 'vue-router'

import { signInWithPopup } from 'firebase/auth'
import { googleProvider } from '@/firebase'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

import { onAuthStateChanged } from 'firebase/auth'



onAuthStateChanged(auth, user => {
  if (user) router.push('/pets')
})


async function loginWithGoogle() {
  try {
    await signInWithPopup(auth, googleProvider)
    router.push('/pets')
  } catch (e) {
    error.value = 'Google prijava nije uspjela'
  }
}


async function login() {
  error.value = ''

  if (!email.value || !password.value) {
    error.value = 'Unesite email i lozinku'
    return
  }

  try {
    await signInWithEmailAndPassword(auth, email.value, password.value)
    router.push('/pets')
  } catch (e) {
    error.value = 'Neispravni podaci'
  }
}
</script>

<template>
  <div class="max-w-md space-y-4">

    <button @click="loginWithGoogle" class="bg-red-500 text-white px-4 py-2 rounded w-full">
        Prijava putem Googlea
    </button>



    <h1 class="text-2xl font-bold">Prijava</h1>

    <input
      v-model="email"
      type="email"
      placeholder="Email"
      class="border p-2 rounded w-full"
    />

    <input
      v-model="password"
      type="password"
      placeholder="Lozinka"
      class="border p-2 rounded w-full"
    />

    <button
      @click="login"
      class="bg-[#00798c] text-white px-4 py-2 rounded w-full"
    >
      Prijavi se
    </button>

    <p v-if="error" class="text-red-600">{{ error }}</p>
  </div>
</template>
