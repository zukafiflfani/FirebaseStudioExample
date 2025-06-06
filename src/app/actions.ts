'use server';

import { z } from 'zod';
import { suggestAdCopy, type SuggestAdCopyInput } from '@/ai/flows/suggest-ad-copy';

// Schema for contact form
const ContactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export type ContactFormState = {
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
  success: boolean;
};

export async function handleContactFormSubmit(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const validatedFields = ContactFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      message: "Validation failed. Please check your input.",
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  // In a real application, you would send an email or save to a database here.
  // For this example, we'll just log it and return a success message.
  console.log('Contact Form Submitted:', validatedFields.data);

  return {
    message: 'Thank you for your message! We will get back to you soon.',
    success: true,
  };
}


// AI Ad Copy Suggester Action
export type AdCopyState = {
  suggestions?: string[];
  error?: string;
  isLoading: boolean;
};

export async function getAdCopySuggestionsAction(
  photoDataUri: string
): Promise<AdCopyState> {
  if (!photoDataUri || !photoDataUri.startsWith('data:image')) {
    return { error: 'Invalid image data provided.', isLoading: false };
  }

  try {
    const input: SuggestAdCopyInput = { photoDataUri };
    const result = await suggestAdCopy(input);
    
    if (result.adCopySuggestions && result.adCopySuggestions.length > 0) {
      return { suggestions: result.adCopySuggestions, isLoading: false };
    } else {
      return { error: 'No suggestions could be generated. Try a different image.', isLoading: false };
    }
  } catch (e) {
    console.error("Error getting ad copy suggestions:", e);
    const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred while generating ad copy.';
    return { error: `Failed to generate ad copy: ${errorMessage}`, isLoading: false };
  }
}
