'use server'

import prisma from "@/prisma/client";
import { helpFormSchema, HelpFormType } from "@/validations/get-help-validation";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { createUser } from "./user.actions";

export async function createNewHelpForm(

  prevState: { errors: Partial<Record<keyof HelpFormType, string[]>> } | undefined,
  formData: FormData
) {
  const session = await auth();
  console.log("this =>", session?.user.email)

  const rawData = Object.fromEntries(formData.entries());

  let parsedDocuments: unknown[] | undefined;

  if (typeof rawData.documents === 'string' && rawData.documents.length > 0) {
    try {
      parsedDocuments = JSON.parse(rawData.documents);
    } catch (error) {
      return {
        errors: {
          documents: ["Invalid document data format. Could not parse JSON."],
        },
        success: false,
      };
    }
  }

  // If logged in, override email with session email
  const effectiveEmail = session?.user?.email ?? rawData.emailAddress;

  const dataForValidation = {
    ...rawData,
    emailAddress: effectiveEmail,
    documents: parsedDocuments,
  };

  const parsed = helpFormSchema.safeParse(dataForValidation);

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const payload = parsed.data;

  let userId: string | null = null
  const existingUser = await prisma.user.findFirst({
    where: {
      email: payload.emailAddress
    }
  })
  console.log(existingUser)
  if (existingUser) {
    userId = existingUser.id
  } else {
    const newUser = await createUser({ email: payload.emailAddress, name: payload.fullName, status: "inactive", })
    userId = newUser.id
  }

  await prisma.getHelpQuestion.create({
    data: {
      userId: userId,
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

  redirect("/thank-you");
}
