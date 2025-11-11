/**
 * Node modules
 */
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

/**
 * Purify the blog content
 */
const window = new JSDOM('').window;
const purify = DOMPurify(window);

/**
 * Clean content from HTML tags
 * @param content The content to clean
 * @returns The cleaned content
 */
export const contentCleaner = (content: string): string => {
  return purify.sanitize(content);
};
