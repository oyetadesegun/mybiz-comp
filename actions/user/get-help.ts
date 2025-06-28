'use server'

import prisma from "@/prisma/client/client";
import { helpFormSchema, HelpFormType } from "@/validations/get-help-validation";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export async function createNewHelpForm(
  
  prevState: { errors: Partial<Record<keyof HelpFormType, string[]>> } | undefined,
  formData: FormData
) {
  const session = await auth();
  console.log("this =>",session?.user.email)

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

  // Try to get profileId if user is authenticated
  let profileId: string | null = null;
  if (session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { profile: true },
    });

    profileId = user?.profile?.id ?? null;
  }

  await prisma.getHelpQuestion.create({
    data: {
      profileId: session?.user.id,
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
