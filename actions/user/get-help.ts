'use server'

import prisma from "@/prisma/client/client";
import { helpFormSchema, HelpFormType } from "@/validations/get-help-validation"
import { redirect } from "next/navigation";

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
        success: false
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


  const payload = parsed.data

  await prisma.getHelpQuestion.create({
    data: {
      profileId: null, // or actual user ID if available
      emailAddress: payload.emailAddress,
      title: payload.title,
      businessName: payload.businessName,
      businessType: payload.businessType,
      businessChallenge: payload.businessChallenge,
      businessCategory: payload.category,
      urgencyLevel: payload.urgency,
      fullName: payload.fullName,
      businessAddress: payload.businessAddress,
      phone: payload.phone,
      willingToPay: payload.willingToPay,
      websiteUrl: payload.websiteUrl,
      instagramUrl: payload.instagramUrl,
      twitterUrl: payload.twitterUrl,
      facebookUrl: payload.facebookUrl,

      documents: payload.documents && payload.documents.length > 0
        ? {
          create: payload.documents.map(doc => ({
            name: doc.name,
            size: doc.size,
            url: doc.url
          }))
        }
        : undefined
    }
  });

  redirect("/thank-you")

}