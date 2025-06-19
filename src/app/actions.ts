
'use server';

import { z } from 'zod';
import emailjs from '@emailjs/browser';

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

  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    console.error('EmailJS environment variables are not set.');
    return {
      message: 'Configuration error: EmailJS credentials are not set on the server.',
      success: false,
    };
  }

  const templateParams = {
    from_name: name,
    from_email: email,
    to_name: 'AdCraft Studio Team', // Or your company name
    message: message,
  };

  try {
    await emailjs.send(serviceId, templateId, templateParams, publicKey);
    return {
      message: 'Thank you for your message! We have received your inquiry and will get back to you soon.',
      success: true,
    };
  } catch (error) {
    console.error('Failed to send email via EmailJS:', error);
    // It's good practice to avoid exposing too much detail about the error to the client.
    // You might want to log the detailed error on the server for debugging.
    return {
      message: 'Failed to send your message due to a server error. Please try again later or contact us directly.',
      success: false,
    };
  }
}
