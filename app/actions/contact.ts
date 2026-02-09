'use server';

import { contactFormSchema, type ContactFormData } from '@/lib/validations/contact';
// import { generateEmailTemplate } from '@/lib/emailTemplate'; // TODO: Uncomment when implementing email sending

/**
 * Contact Form Server Action
 * 
 * Handles contact form submissions with validation and email sending.
 * Uses Server Actions for secure server-side processing.
 * 
 * @requirements 6.1, 6.2, 6.3
 */

export interface ContactFormResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

export async function submitContactForm(
  data: ContactFormData
): Promise<ContactFormResponse> {
  try {
    // Validate form data
    const validatedData = contactFormSchema.parse(data);

    // Log the submission (for development)
    console.log('📧 Contact form submission:', {
      ...validatedData,
      timestamp: new Date().toISOString(),
    });

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // TODO: Phase F - Implement email sending via Zoho SMTP
    // Example using nodemailer with Zoho SMTP:
    // await sendEmail({
    //   to: process.env.CONTACT_EMAIL,
    //   subject: `Nouvelle demande: ${validatedData.requestType}`,
    //   html: generateEmailTemplate(validatedData),
    // });

    return {
      success: true,
      message: 'Votre message a été envoyé avec succès. Nous vous recontacterons sous 24 heures ouvrables.',
    };
  } catch (error) {
    console.error('❌ Contact form error:', error);

    // Handle validation errors
    if (error instanceof Error && 'issues' in error) {
      const zodError = error as any;
      const errors: Record<string, string[]> = {};

      zodError.issues.forEach((issue: any) => {
        const path = issue.path.join('.');
        if (!errors[path]) {
          errors[path] = [];
        }
        errors[path].push(issue.message);
      });

      return {
        success: false,
        message: 'Veuillez corriger les erreurs dans le formulaire.',
        errors,
      };
    }

    // Handle other errors
    return {
      success: false,
      message: 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.',
    };
  }
}

