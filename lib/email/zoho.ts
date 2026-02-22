import nodemailer from 'nodemailer';
import type { ContactFormData } from '@/lib/validations/contact';

/**
 * Zoho SMTP Configuration
 * 
 * Configures nodemailer transporter for Zoho Mail SMTP service.
 * Used for sending contact form submissions via email.
 * 
 * @requirements 8.1, 8.2, 8.3, 8.4
 */

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

/**
 * Creates and configures Zoho SMTP transporter
 */
export function createZohoTransporter() {
  return nodemailer.createTransport({
    host: process.env.ZOHO_SMTP_HOST || 'smtp.zoho.com',
    port: parseInt(process.env.ZOHO_SMTP_PORT || '465'),
    secure: true, // Use SSL/TLS
    auth: {
      user: process.env.ZOHO_SMTP_USER!,
      pass: process.env.ZOHO_SMTP_PASSWORD!,
    },
    // Connection timeout settings
    connectionTimeout: 10000, // 10 seconds
    greetingTimeout: 10000,
    socketTimeout: 10000,
  });
}

/**
 * Generates professional HTML email template from contact form data
 */
export function generateEmailTemplate(data: ContactFormData): string {
  const requestTypeLabels: Record<string, string> = {
    financement: 'Financement de Projet',
    investissement: 'Opportunité d\'Investissement',
    conseil: 'Conseil Stratégique',
    gestion: 'Gestion de Fonds',
    autre: 'Autre Demande',
  };

  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Nouvelle Demande de Contact</title>
      <style>
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          line-height: 1.6;
          color: #1a1a1a;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f5f5f5;
        }
        .container {
          background-color: #ffffff;
          border-radius: 8px;
          padding: 40px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
          border-bottom: 3px solid #2283a2;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .header h1 {
          font-family: 'Playfair Display', serif;
          color: #2283a2;
          margin: 0;
          font-size: 24px;
        }
        .header p {
          color: #666;
          margin: 5px 0 0 0;
          font-size: 14px;
        }
        .field {
          margin-bottom: 20px;
        }
        .field-label {
          font-weight: 600;
          color: #2283a2;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 5px;
        }
        .field-value {
          color: #1a1a1a;
          font-size: 15px;
          padding: 10px;
          background-color: #f9f9f9;
          border-left: 3px solid #E9C46A;
          border-radius: 4px;
        }
        .message-box {
          background-color: #f9f9f9;
          border-left: 3px solid #588157;
          padding: 15px;
          border-radius: 4px;
          margin-top: 10px;
        }
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #e0e0e0;
          text-align: center;
          color: #666;
          font-size: 12px;
        }
        .badge {
          display: inline-block;
          background-color: #2283a2;
          color: white;
          padding: 4px 12px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
          margin-top: 5px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Nouvelle Demande de Contact</h1>
          <p>Reçue le ${new Date().toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}</p>
        </div>

        <div class="field">
          <div class="field-label">Type de Demande</div>
          <div class="field-value">
            <span class="badge">${requestTypeLabels[data.requestType] || data.requestType}</span>
          </div>
        </div>

        <div class="field">
          <div class="field-label">Nom Complet</div>
          <div class="field-value">${data.name}</div>
        </div>

        <div class="field">
          <div class="field-label">Organisation / Entreprise</div>
          <div class="field-value">${data.organization}</div>
        </div>

        ${data.title ? `
        <div class="field">
          <div class="field-label">Titre / Fonction</div>
          <div class="field-value">${data.title}</div>
        </div>
        ` : ''}

        <div class="field">
          <div class="field-label">Email Professionnel</div>
          <div class="field-value">
            <a href="mailto:${data.email}" style="color: #2283a2; text-decoration: none;">
              ${data.email}
            </a>
          </div>
        </div>

        ${data.phone ? `
        <div class="field">
          <div class="field-label">Téléphone</div>
          <div class="field-value">
            <a href="tel:${data.phone}" style="color: #2283a2; text-decoration: none;">
              ${data.phone}
            </a>
          </div>
        </div>
        ` : ''}

        ${data.country ? `
        <div class="field">
          <div class="field-label">Pays</div>
          <div class="field-value">${data.country}</div>
        </div>
        ` : ''}

        <div class="field">
          <div class="field-label">Message / Description du Projet</div>
          <div class="message-box">
            ${data.message.replace(/\n/g, '<br>')}
          </div>
        </div>

        <div class="footer">
          <p>
            <strong>TYCHERA INVESTMENTS LTD</strong><br>
            Immeuble OHANA, Nyarutarama, Kigali, Rwanda<br>
            <a href="mailto:contact@tycherainvest.com" style="color: #2283a2;">
              contact@tycherainvest.com
            </a> | +250 722 138 799
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Sends email using Zoho SMTP
 * 
 * @param options Email options (to, subject, html)
 * @returns Promise that resolves when email is sent
 * @throws Error if email sending fails
 */
export async function sendEmail(options: EmailOptions): Promise<void> {
  const transporter = createZohoTransporter();

  const mailOptions = {
    from: `"TYCHERA Investments" <${process.env.ZOHO_SMTP_USER}>`,
    to: options.to,
    subject: options.subject,
    html: options.html,
  };

  await transporter.sendMail(mailOptions);
}
