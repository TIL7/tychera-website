'use server';

import { contactFormSchema, type ContactFormData } from '@/lib/validations/contact';
import { sendEmail, generateEmailTemplate } from '@/lib/email/zoho';

/**
 * Contact Form Server Action
 * 
 * Handles contact form submissions with validation and email sending.
 * Uses Server Actions for secure server-side processing.
 * 
 * @requirements 7.5, 7.8, 7.9, 8.1, 8.2, 8.3, 8.4, 8.5, 8.6
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
    // Validate form data on server side
    const validatedData = contactFormSchema.parse(data);

    // Honeypot check — bots fill hidden fields
    if (validatedData.website && validatedData.website.length > 0) {
      // Silent rejection — return success-like response to avoid revealing protection
      return { success: true, message: 'Votre message a été envoyé avec succès.' };
    }

    // Minimum submission time check — reject ultra-fast submissions
    if (validatedData.formRenderedAt) {
      const elapsed = Date.now() - Number(validatedData.formRenderedAt);
      if (elapsed < 3000) {
        return {
          success: false,
          message: 'Veuillez prendre le temps de remplir le formulaire.',
        };
      }
    }

    // Log the submission (for development and debugging)
    console.log('Email: Contact form submission:', {
      name: validatedData.name,
      organization: validatedData.organization,
      email: validatedData.email,
      requestType: validatedData.requestType,
      timestamp: new Date().toISOString(),
    });

    // Check if SMTP credentials are configured
    if (!process.env.ZOHO_SMTP_USER || !process.env.ZOHO_SMTP_PASSWORD) {
      console.error('Error: SMTP credentials not configured');
      return {
        success: false,
        message: 'La configuration email n\'est pas disponible. Veuillez contacter l\'administrateur.',
      };
    }

    if (!process.env.CONTACT_EMAIL_RECIPIENT) {
      console.error('Error: Contact email recipient not configured');
      return {
        success: false,
        message: 'La configuration email n\'est pas disponible. Veuillez contacter l\'administrateur.',
      };
    }

    // Generate email subject based on request type
    const requestTypeLabels: Record<string, string> = {
      financement: 'Financement de Projet',
      investissement: 'Opportunité d\'Investissement',
      conseil: 'Conseil Stratégique',
      gestion: 'Structuration de Garanties',
      autre: 'Autre Demande',
    };

    const subject = `Nouvelle demande: ${requestTypeLabels[validatedData.requestType]} - ${validatedData.organization}`;

    // Send email via Zoho SMTP
    try {
      await sendEmail({
        to: process.env.CONTACT_EMAIL_RECIPIENT,
        subject,
        html: generateEmailTemplate(validatedData),
      });

      console.log('OK: Email sent successfully to:', process.env.CONTACT_EMAIL_RECIPIENT);

      return {
        success: true,
        message: 'Votre message a été envoyé avec succès. Nous vous recontacterons sous 24 heures ouvrables.',
      };
    } catch (emailError) {
      // Handle SMTP-specific errors
      console.error('Error: Email sending error:', emailError);

      // Check for specific SMTP error types
      if (emailError instanceof Error) {
        const errorMessage = emailError.message.toLowerCase();

        // Connection timeout
        if (errorMessage.includes('timeout') || errorMessage.includes('etimedout')) {
          return {
            success: false,
            message: 'Le délai de connexion au serveur email a expiré. Veuillez réessayer dans quelques instants.',
          };
        }

        // Authentication failure
        if (errorMessage.includes('auth') || errorMessage.includes('authentication') || errorMessage.includes('535')) {
          console.error('Error: SMTP authentication failed - check credentials');
          return {
            success: false,
            message: 'Erreur d\'authentification email. Veuillez contacter l\'administrateur.',
          };
        }

        // Rate limiting
        if (errorMessage.includes('rate limit') || errorMessage.includes('too many') || errorMessage.includes('421')) {
          return {
            success: false,
            message: 'Trop de demandes envoyées. Veuillez réessayer dans quelques minutes.',
          };
        }

        // Connection refused
        if (errorMessage.includes('econnrefused') || errorMessage.includes('connection refused')) {
          return {
            success: false,
            message: 'Impossible de se connecter au serveur email. Veuillez réessayer plus tard.',
          };
        }

        // Invalid recipient
        if (errorMessage.includes('recipient') || errorMessage.includes('550')) {
          console.error('Error: Invalid recipient email address');
          return {
            success: false,
            message: 'Adresse email de destination invalide. Veuillez contacter l\'administrateur.',
          };
        }
      }

      // Generic SMTP error
      return {
        success: false,
        message: 'Une erreur est survenue lors de l\'envoi de l\'email. Veuillez réessayer ou nous contacter directement.',
      };
    }
  } catch (error) {
    console.error('Error: Contact form error:', error);

    // Handle Zod validation errors
    if (error instanceof Error && 'issues' in error) {
      const zodError = error as { issues: Array<{ path: (string | number)[]; message: string }> };
      const errors: Record<string, string[]> = {};

      zodError.issues.forEach((issue) => {
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

    // Handle other unexpected errors
    return {
      success: false,
      message: 'Une erreur inattendue est survenue. Veuillez réessayer ou nous contacter directement par téléphone.',
    };
  }
}


