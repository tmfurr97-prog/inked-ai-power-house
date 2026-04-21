export function getAdminEmails(): string[] {
  const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS || '';
  return adminEmails.split(',').map((email) => email.trim()).filter(Boolean);
}

export function isAdminUser(user: any): boolean {
  if (!user || !user.email) return false;
  const adminEmails = getAdminEmails();
  return adminEmails.includes(user.email);
}