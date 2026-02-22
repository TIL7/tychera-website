import type { ContactFormData } from '@/lib/validations/contact';
import { escapeHtml } from '@/lib/email/escapeHtml';

/**
 * Generate HTML email template
 * 
 * @param data - Validated form data
 * @returns HTML email content
 */
export function generateEmailTemplate(data: ContactFormData): string {
    const requestTypeLabels: Record<string, string> = {
        financement: 'Financement de Projet',
        investissement: 'Opportunité d\'Investissement',
        conseil: 'Conseil Stratégique & Structuration',
        gestion: 'Gestion de Fonds',
        autre: 'Autre demande',
    };

    return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Inter, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #2283a2; color: white; padding: 20px; text-align: center; }
          .content { background-color: #f9f9f9; padding: 20px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: 600; color: #2283a2; }
          .value { margin-top: 5px; }
          .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Nouvelle Demande de Contact</h1>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Type de demande:</div>
              <div class="value">${escapeHtml(requestTypeLabels[data.requestType] ?? data.requestType)}</div>
            </div>
            <div class="field">
              <div class="label">Nom:</div>
              <div class="value">${escapeHtml(data.name)}</div>
            </div>
            <div class="field">
              <div class="label">Organisation:</div>
              <div class="value">${escapeHtml(data.organization)}</div>
            </div>
            ${data.title ? `
            <div class="field">
              <div class="label">Titre:</div>
              <div class="value">${escapeHtml(data.title)}</div>
            </div>
            ` : ''}
            <div class="field">
              <div class="label">Email:</div>
              <div class="value"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></div>
            </div>
            ${data.phone ? `
            <div class="field">
              <div class="label">Téléphone:</div>
              <div class="value"><a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a></div>
            </div>
            ` : ''}
            ${data.country ? `
            <div class="field">
              <div class="label">Pays:</div>
              <div class="value">${escapeHtml(data.country)}</div>
            </div>
            ` : ''}
            <div class="field">
              <div class="label">Message:</div>
              <div class="value">${escapeHtml(data.message).replace(/\n/g, '<br>')}</div>
            </div>
          </div>
          <div class="footer">
            <p>TYCHERA INVESTMENTS LTD | Immeuble OHANA, Kigali, Rwanda</p>
            <p>Ce message a été envoyé depuis le formulaire de contact du site web.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}
