import { z } from 'zod';

/**
 * Contact Form Validation Schema
 * 
 * Defines validation rules for the contact form using Zod.
 * Ensures data integrity before submission.
 * 
 * @requirements 6.1, 6.2
 */

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(100, 'Le nom ne peut pas dépasser 100 caractères'),
  
  organization: z
    .string()
    .min(2, 'L\'organisation doit contenir au moins 2 caractères')
    .max(200, 'L\'organisation ne peut pas dépasser 200 caractères'),
  
  title: z
    .string()
    .max(100, 'Le titre ne peut pas dépasser 100 caractères')
    .optional(),
  
  email: z
    .string()
    .email('Adresse email invalide')
    .toLowerCase(),
  
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Numéro de téléphone invalide (format international requis)')
    .optional()
    .or(z.literal('')),
  
  country: z
    .string()
    .min(2, 'Le pays doit contenir au moins 2 caractères')
    .max(100, 'Le pays ne peut pas dépasser 100 caractères')
    .optional()
    .or(z.literal('')),
  
  requestType: z.enum([
    'financement',
    'investissement',
    'conseil',
    'gestion',
    'autre'
  ], {
    errorMap: () => ({ message: 'Veuillez sélectionner un type de demande' })
  }),
  
  message: z
    .string()
    .min(20, 'Le message doit contenir au moins 20 caractères')
    .max(2000, 'Le message ne peut pas dépasser 2000 caractères'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

/**
 * Validation error messages in English
 * Used when locale is 'en'
 */
export const contactFormSchemaEN = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name cannot exceed 100 characters'),
  
  organization: z
    .string()
    .min(2, 'Organization must be at least 2 characters')
    .max(200, 'Organization cannot exceed 200 characters'),
  
  title: z
    .string()
    .max(100, 'Title cannot exceed 100 characters')
    .optional(),
  
  email: z
    .string()
    .email('Invalid email address')
    .toLowerCase(),
  
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number (international format required)')
    .optional()
    .or(z.literal('')),
  
  country: z
    .string()
    .min(2, 'Country must be at least 2 characters')
    .max(100, 'Country cannot exceed 100 characters')
    .optional()
    .or(z.literal('')),
  
  requestType: z.enum([
    'financement',
    'investissement',
    'conseil',
    'gestion',
    'autre'
  ], {
    errorMap: () => ({ message: 'Please select a request type' })
  }),
  
  message: z
    .string()
    .min(20, 'Message must be at least 20 characters')
    .max(2000, 'Message cannot exceed 2000 characters'),
});
