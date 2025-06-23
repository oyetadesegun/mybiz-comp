import { z } from "zod"

export const documentMetaDataSchema = z.object({
  name: z.string(),
  size: z.string(),
  url: z.string().url(),
  uploaded_at: z.string().optional(),
})

export type DocumentMetaData = z.infer<typeof documentMetaDataSchema>