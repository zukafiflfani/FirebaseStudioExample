'use server';

import { z } from 'zod';
import nodemailer from 'nodemailer';

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

  // Nodemailer transporter setup
  // IMPORTANT: You must configure these environment variables in your .env file
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587), // Default to 587 if not specified
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER, // Your email address
      pass: process.env.SMTP_PASS, // Your email password or app password
    },
  });

  const mailOptions = {
    from: `"${name}" <${process.env.SMTP_FROM_EMAIL || email}>`, // Sender address (can be your configured email or the user's)
    to: 'zurab.filfani@gmail.com', // List of receivers
    replyTo: email, // Set reply-to as the user's email
    subject: `New Contact Form Submission from ${name}`, // Subject line
    text: `You have received a new message from your contact form:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`, // Plain text body
    html: `<p>You have received a new message from your contact form:</p>
           <ul>
             <li><strong>Name:</strong> ${name}</li>
             <li><strong>Email:</strong> ${email}</li>
             <li><strong>Message:</strong> ${message}</li>
           </ul>`, // HTML body
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Contact Form Submitted and Email Sent:', validatedFields.data);
    return {
      message: 'Thank you for your message! We will get back to you soon.',
      success: true,
    };
  } catch (error) {
    console.error('Failed to send email:', error);
    return {
      message: 'Failed to send your message. Please try again later or contact us directly.',
      success: false,
    };
  }
}