import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'MISSING_CLOUD_NAME',
  api_key: process.env.CLOUDINARY_API_KEY || 'MISSING_API_KEY',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'MISSING_API_SECRET'
})

console.log("CLOUDINARY CONFIG:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET ? '***' : 'MISSING'
})

export default defineEventHandler(async () => {
  try {
    console.log("CLOUDINARY ENV:", {
      name: process.env.CLOUDINARY_CLOUD_NAME,
      key: process.env.CLOUDINARY_API_KEY,
      secret: process.env.CLOUDINARY_API_SECRET ? '***' : 'MISSING'
    })

    const res = await cloudinary.search
      .expression('resource_type:image AND folder="festa-foto"')
      .sort_by('created_at','desc')
      .max_results(30)
      .execute()

    return res.resources.map((r: any) => r.secure_url)
  } catch (error) {
    console.error("CLOUDINARY ERROR:", error)
    throw createError({ statusCode: 500, message: 'Errore caricamento immagini' })
  }
})
