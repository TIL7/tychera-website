/**
 * Escapes HTML special characters in a string to prevent injection
 * in HTML email templates. No external dependencies.
 *
 * Replacement order matters: & must be first to avoid double-escaping.
 */
export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
