import { v2 as cloudinary } from 'cloudinary'
import formidable from 'formidable'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!
})

export default defineEventHandler(async (event) => {
  try {
    const form = formidable({ keepExtensions: true, multiples: false })

    const [fields, files] = await form.parse(event.node.req)
    const file = files.photo?.[0]

    if (!file) {
      throw createError({ statusCode: 400, message: 'No file uploaded' })
    }

    const result = await cloudinary.uploader.upload(file.filepath, {
      folder: 'festa-foto'
    })
    return { url: result.secure_url }
  } catch (err) {
    console.error('Upload error:', err)
    throw createError({ statusCode: 500, message: 'Errore durante l\'upload' })
  }
})