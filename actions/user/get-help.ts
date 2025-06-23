'use server'

import { helpFormSchema, HelpFormType } from "@/validations/get-help-validation"

export async function createNewHelpForm(
  prevState: { errors: Partial<Record<keyof HelpFormType, string[]>> } | undefined,
  formData: FormData
) {
  const rawData = Object.fromEntries(formData.entries())

  let parsedDocuments: unknown[] | undefined;

  if (typeof rawData.documents === 'string' && rawData.documents.length > 0) {
    try {
      parsedDocuments = JSON.parse(rawData.documents);
    } catch (error) {
      return {
        errors: {
          documents: ["Invalid document data format. Could not parse JSON."],
        },
      };
    }
  }

  const dataForValidation = {
    ...rawData,
    documents: parsedDocuments,
  };

  const parsed = helpFormSchema.safeParse(dataForValidation)

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
    }
  }

  if (true) {
    return {
      errors: {},
      success: true,
      message: "Successful"
    }
  }

}