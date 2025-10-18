export function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim(); // Remove leading/trailing spaces
}

// Examples:
// "Gata Only Slowed" → "gata-only-slowed"
// "Viral Phonk Beat (Dark)" → "viral-phonk-beat-dark"
