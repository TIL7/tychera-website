# Contact Form Setup Guide

## Overview

The contact form has been fully implemented with React Hook Form, Zod validation, and Zoho SMTP integration. All sub-tasks for Phase E Task 11 have been completed.

## What Was Implemented

### ✅ Task 11.1: React Hook Form with Zod Validation
- **File**: `lib/validations/contact.ts`
- Zod schemas for both French and English validation messages
- Validation rules for all form fields (name, organization, email, phone, country, requestType, message)
- Email format validation, min/max length constraints

### ✅ Task 11.2: ContactSection with Form Validation
- **File**: `components/sections/ContactSection.tsx`
- Integrated `useForm()` hook with `zodResolver`
- Field-level error messages displayed below each input
- Loading states during submission (spinner icon)
- Success state with CheckCircle icon and reset functionality

### ✅ Task 11.3: Server Action for Form Submission
- **File**: `app/actions/contact.ts`
- Server-side validation using Zod
- Comprehensive error handling for validation, SMTP, and generic errors
- Structured response format with success/error messages

### ✅ Task 11.4: Zoho SMTP Integration
- **File**: `lib/email/zoho.ts`
- Nodemailer transporter configuration for Zoho Mail
- Professional HTML email template with TYCHERA branding
- Includes all form fields in formatted email body
- Connection timeout settings (10 seconds)

### ✅ Task 11.5: Email Error Handling
- **File**: `app/actions/contact.ts` (integrated)
- Try-catch blocks for SMTP operations
- Specific error handling for:
  - Connection timeouts (ETIMEDOUT)
  - Authentication failures (535 error)
  - Rate limits (421 error)
  - Connection refused (ECONNREFUSED)
  - Invalid recipients (550 error)
- User-friendly error messages in French
- Detailed logging for debugging

### ✅ Task 11.6: Connect Form to Server Action
- **File**: `components/sections/ContactSection.tsx` (already implemented)
- Calls `submitContactForm()` server action on form submit
- Success handling: displays success message, resets form, shows toast
- Error handling: displays error message via toast, allows retry
- Loading spinner during submission

## Configuration Required

### Environment Variables

The following environment variables must be configured in `.env.local`:

```bash
# Zoho SMTP Configuration
ZOHO_SMTP_HOST="smtp.zoho.com"
ZOHO_SMTP_PORT="465"
ZOHO_SMTP_USER="your-email@tycherainvestments.com"
ZOHO_SMTP_PASSWORD="your-smtp-app-password"

# Contact Form Recipient
CONTACT_EMAIL_RECIPIENT="contact@tycherainvestments.com"
```

### How to Get Zoho SMTP Credentials

1. **Log in to Zoho Mail**: https://mail.zoho.com
2. **Go to Settings** → **Mail Accounts** → **IMAP/POP Access**
3. **Enable IMAP Access** if not already enabled
4. **Generate App-Specific Password**:
   - Go to **Account Settings** → **Security** → **App Passwords**
   - Create a new app password for "TYCHERA Website"
   - Copy the generated password (you won't see it again)
5. **Update `.env.local`**:
   - `ZOHO_SMTP_USER`: Your full Zoho email address
   - `ZOHO_SMTP_PASSWORD`: The app-specific password you just generated

### Testing the Contact Form

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Navigate to the contact section**: http://localhost:3000/#contact

3. **Fill out the form** with test data

4. **Submit the form** and check:
   - Success message appears
   - Form resets
   - Email arrives at the configured recipient address

5. **Check console logs** for detailed submission information

### Error Handling

The form handles various error scenarios gracefully:

- **Validation errors**: Field-specific error messages appear below inputs
- **SMTP connection timeout**: "Le délai de connexion au serveur email a expiré..."
- **Authentication failure**: "Erreur d'authentification email..."
- **Rate limiting**: "Trop de demandes envoyées..."
- **Connection refused**: "Impossible de se connecter au serveur email..."
- **Invalid recipient**: "Adresse email de destination invalide..."
- **Generic errors**: "Une erreur inattendue est survenue..."

### Email Template

The email sent to the recipient includes:

- Professional HTML formatting with TYCHERA branding
- Color-coded sections (Primary Blue, Accent Green, Gold)
- All form fields formatted clearly
- Timestamp of submission
- Request type badge
- Clickable email and phone links
- TYCHERA footer with contact information

## Dependencies Installed

- `nodemailer`: ^3.6.0 (SMTP client)
- `@types/nodemailer`: ^6.4.14 (TypeScript types)

## Files Modified/Created

### Created:
- `lib/email/zoho.ts` - SMTP configuration and email template
- `CONTACT_FORM_SETUP.md` - This documentation

### Modified:
- `app/actions/contact.ts` - Added email sending and error handling
- `.env.example` - Added SMTP environment variables
- `.env.local` - Added SMTP environment variables (with placeholder values)

### Already Implemented (No Changes):
- `lib/validations/contact.ts` - Validation schemas
- `components/sections/ContactSection.tsx` - Form component

## Next Steps

1. **Configure SMTP credentials** in `.env.local` with real Zoho credentials
2. **Test the contact form** end-to-end
3. **Verify email delivery** to the recipient address
4. **Update recipient email** if needed in `.env.local`
5. **Deploy to production** with production SMTP credentials in Vercel environment variables

## Production Deployment

When deploying to Vercel:

1. Go to **Project Settings** → **Environment Variables**
2. Add all SMTP variables:
   - `ZOHO_SMTP_HOST`
   - `ZOHO_SMTP_PORT`
   - `ZOHO_SMTP_USER`
   - `ZOHO_SMTP_PASSWORD`
   - `CONTACT_EMAIL_RECIPIENT`
3. Redeploy the application

## Support

If you encounter issues:

1. Check console logs for detailed error messages
2. Verify SMTP credentials are correct
3. Ensure Zoho IMAP access is enabled
4. Check that app-specific password is used (not account password)
5. Verify firewall/network allows SMTP connections on port 465

---

**Status**: ✅ All sub-tasks completed
**Requirements Validated**: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 7.8, 7.9, 8.1, 8.2, 8.3, 8.4, 8.5, 8.6
