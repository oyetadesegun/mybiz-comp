import { z } from "zod"
import { documentMetaDataSchema } from "./shared-validation"


// --- Zod Validation Schema ---
export const helpFormSchema = z.object({
  // Step 1
  title: z.string().min(5, { message: "Title must be at least 5 characters long." }),
  businessName: z.string().min(2, { message: "Business name is required." }),
  businessType: z.string({ required_error: "Please select a business type." }),

  businessChallenge: z.string().min(2, { message: "Please describe your challenge in more detail." }),
  category: z.string({ required_error: "Please select a category." }),
  urgency: z.string({ required_error: "Please select an urgency level." }),

  // Step 2
  fullName: z.string().min(2, { message: "Full name is required." }),
  businessAddress: z.string({ required_error: "Please select a business type." }).min(5),
  phone: z
    .string()
    .min(10, { message: "Please enter a valid phone number." })
    .regex(/^(\+?\d{1,4}?[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?[\d\s.-]{7,15}$/, "Invalid phone number format."),
  willingToPay: z.string().min(1, { message: "Please enter an amount." }),
  referralCode: z.string().optional(),
  websiteUrl: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal("")),
  instagramUrl: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal("")),
  twitterUrl: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal("")),
  facebookUrl: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal("")),
  documents: z.array(documentMetaDataSchema).optional(),
})

export type HelpFormType = z.infer<typeof helpFormSchema>