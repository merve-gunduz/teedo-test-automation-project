import { Page, expect } from '@playwright/test';

export async function waitForNetworkIdle(page: Page) {
  // Hepsiburada gibi yoğun istek atan sayfalarda "networkidle" her zaman stabilize olmayabilir.
  // Bu helper daha kontrollü bir yaklaşım sağlar.
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(500); // kısa tampon
}

export async function expectUrlContains(page: Page, part: string) {
  await expect(page).toHaveURL(new RegExp(part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'));
}
