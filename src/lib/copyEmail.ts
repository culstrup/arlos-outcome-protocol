export const CONTACT_EMAIL = 'christian@gsdat.work';

export function copyEmail() {
  navigator.clipboard.writeText(CONTACT_EMAIL);
  alert(`Email address copied to clipboard: ${CONTACT_EMAIL}`);
}
