export default defineNuxtConfig({
  css: ['bootstrap/dist/css/bootstrap.min.css'],
  runtimeConfig: {
    cloudinary: {
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      apiSecret: process.env.CLOUDINARY_API_SECRET
    }
  }
})
