<script setup>
const { data: images } = await useFetch('/api/images')
</script>

<template>
  <div class="container py-5 text-center">
    <h1 class="mb-4">🎉 Galleria Foto</h1>
    <div class="row g-3">
      <div class="col-6 col-md-3" v-for="url in images" :key="url">
        <img :src="url" class="img-fluid rounded shadow-sm" />
      </div>
    </div>
  </div>
</template>
