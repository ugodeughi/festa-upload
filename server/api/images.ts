import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!
})

export default defineEventHandler(async () => {
  const res = await cloudinary.search
    .expression('resource_type:image AND folder="festa-foto"')
    .sort_by('created_at','desc')
    .max_results(30)
    .execute()

  return res.resources.map((r: any) => r.secure_url)
})
