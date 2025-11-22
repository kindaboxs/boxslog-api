/* eslint-disable no-unused-vars */
import { customAlphabet } from 'nanoid';

const slugify = (text: string): string => {
  const slug = text
    .toString()
    .toLowerCase()
    .trim()
    .normalize('NFD') // Remove accents/diacritics (é → e, ñ → n)
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/_/g, '-') // Replace underscores with hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[^a-z0-9-]+/g, '') // Keep only lowercase letters, digits, and hyphens
    .replace(/-+/g, '-') // Collapse multiple hyphens to single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens

  return slug;
};

const generateUniqueSlug = (baseSlug: string, length = 6): string => {
  const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', length);
  const suffix = nanoid();

  return `${baseSlug}-${suffix}`;
};

const ensureUniqueSlug = async (
  slug: string,
  checkExists: (slug: string) => Promise<boolean>,
  maxAttempts = 5
): Promise<string> => {
  let uniqueSlug = slug;
  let attempts = 0;

  while (attempts < maxAttempts) {
    const existingSlug = await checkExists(uniqueSlug);

    if (!existingSlug) {
      return uniqueSlug;
    }

    // Generate a new unique slug with a suffix
    uniqueSlug = generateUniqueSlug(slug, 6);
    attempts++;
  }

  // if attempts failed, throw an error
  throw new Error(
    `Unable to generate unique slug after ${maxAttempts} attempts, last candidate: ${uniqueSlug}`
  );
};

export const createUniqueSlug = async (
  slug: string,
  checkExists: (slug: string) => Promise<boolean>
) => {
  const baseSlug = slugify(slug);
  return ensureUniqueSlug(baseSlug, checkExists);
};
