<script setup>
import { ref, nextTick, onMounted } from 'vue'

const showReload = ref(false)

const previewUrl = ref('')

const createObjectURL = (file) => {
  if (typeof window !== 'undefined' && window.URL) {
    previewUrl.value = window.URL.createObjectURL(file)
  } else {
    previewUrl.value = ''
  }
}

const photo = ref(null)
const message = ref('')
const isLoading = ref(false)
const fileInput = ref(null)
const images = ref([])

const loadImages = async () => {
  const data = await $fetch('/api/images')
  images.value = [...data]
}

const uploadPhoto = async () => {
  isLoading.value = true
  const formData = new FormData()
  formData.append('photo', photo.value)

  try {
    await $fetch('/api/upload', {
      method: 'POST',
      body: formData
    })
    message.value = 'Foto caricata con successo!'
    showReload.value = true
    photo.value = null
    nextTick(() => {
      if (fileInput.value) fileInput.value.value = ''
    })
  } catch (e) {
    message.value = 'Errore durante il caricamento'
  } finally {
    await new Promise(resolve => setTimeout(resolve, 1000))
    await loadImages()
    isLoading.value = false
  }
}

const handleFileChange = (e) => {
  const file = e.target?.files?.[0]
  if (file) {
    photo.value = file
    createObjectURL(file)
  }
}

const reloadPage = () => {
  if (typeof window !== 'undefined') {
    window.location.reload()
  }
}

onMounted(loadImages)
</script>

<template>
  <div class="bg-wrapper">
    <div class="container py-5 text-center">
      <h1 class="mb-4">
        SIMONE <span style="color: red;">&hearts;</span> DAVIDE
      </h1>
      <div class="mb-3">
        <input ref="fileInput" type="file" class="form-control" accept="image/*" @change="handleFileChange" />
      </div>
      <div v-if="photo" class="mb-3">
        <img :src="previewUrl" alt="Anteprima" class="img-thumbnail" style="max-height: 200px;" />
      </div>
      <button
        v-if="photo && !isLoading"
        class="btn btn-primary"
        @click="uploadPhoto"
      >
        Carica
      </button>
      <div v-if="isLoading" class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Caricamento...</span>
      </div>
      <div v-if="message" class="alert alert-success mt-4">{{ message }} 
      <br>
        <button v-if="showReload" class="btn btn-secondary mt-3" @click="reloadPage">🔄 Ricarica la pagina</button>
      </div>
      <div v-if="images.length" class="mt-5" :key="images.length">
        <h2 class="mb-3"><span style="color: red;">&hearts;</span>  Galleria Foto <span style="color: red;">&hearts;</span> </h2>
        <div class="row g-3">
          <div class="col-12 col-sm-6 col-md-3" v-for="url in images" :key="url">
            <img :src="url" class="img-fluid rounded shadow-sm" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-wrapper {
  background-image: url('https://cavallazzi.com/wp-content/uploads/2018/12/candelo-ricetto-di-candelo_0604-650x975.jpg');
  background-size:100%;
   /* background-position: center; */
  background-repeat: no-repeat;
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  z-index: 0;
  background-color:rgb(94, 61, 38);
}
.bg-wrapper::before {
  content: "";
  position: absolute;
  inset: 0;
  background-color: rgba(255, 255, 255, 0.3);
  z-index: -1;
}
.container {
  position: relative;
  z-index: 1;
}

h1 {
  font-size: 1.75rem;
}

img.img-thumbnail {
  max-width: 100%;
  height: auto;
}

@media (min-width: 768px) {
  h1 {
    font-size: 2.5rem;
  }

  .img-thumbnail {
    max-height: 200px;
  }
}
</style>
