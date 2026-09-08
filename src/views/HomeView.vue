<script setup>
import { useRouter } from 'vue-router'
import { signOut } from 'firebase/auth'
import { auth } from '@/firebase'

const router = useRouter()

function goTo(path) {
  router.push(path)
}

function logout() {
  signOut(auth)
  router.push('/login')
}
</script>

<template>
  <div>
    <h1 class="text-5xl font-bold mb-15 shadow" style="color:#00798c">
      Dobrodošao!
    </h1>

    <div class="flex flex-col space-y-30 ">
      <div class="w-1/7 cursor-pointer shadow" @click="goTo('/pets')">
        <div class="text-3xl font-bold m-2 flex space-x-1">
          <p style="color: #00798c">Moji</p>
          <p style="color: #fa7528"> ljubimci</p>
        </div>
        <p class="m-2">Pregled i upravljanje ljubimcima</p>
      </div>

      <div class="w-1/7 cursor-pointer shadow" @click="goTo('/activities')">
        <p class="text-3xl font-bold m-2" style="color: #00798c">Aktivnosti</p>
        <p class="m-2">Unos i uređivanje aktivnosti</p>
      </div>

      <div class="w-1/7 cursor-pointer shadow" @click="goTo('/history')">
        <div class="text-3xl font-bold m-2 flex space-x-1">
          <p style="color: #00798c">Pregled</p>
          <p style="color: #fa7528">povijesti</p>
        </div>
        <p class="m-2">Prikaz svih prošlih aktivnosti</p>
      </div>
    </div>
  </div>

  <button
    @click="logout"
    class="mt-15 px-5 py-3 m-1 rounded-full font-bold text-white bg-[#fa7528] hover:bg-[#00798c] transition">
    Odjava
  </button>



</template>
