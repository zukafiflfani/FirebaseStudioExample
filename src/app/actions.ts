'use server';

import { z } from 'zod';
// nodemailer import removed

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

  const { name, email, message } = validatedFields.data;

  // Email sending logic removed.
  // You can add your custom email logic here later.

  try {
    // Simulate successful processing of the form data
    console.log('Contact Form Submitted (no email sent):', validatedFields.data);
    return {
      message: 'Thank you for your message! We have received your inquiry.',
      success: true,
    };
  } catch (error) {
    console.error('Failed to process contact form:', error);
    return {
      message: 'Failed to process your message. Please try again later.',
      success: false,
    };
  }
}
