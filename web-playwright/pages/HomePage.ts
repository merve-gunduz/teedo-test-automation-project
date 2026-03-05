import { Page, Locator, expect } from '@playwright/test';
import { waitForNetworkIdle } from '../utils/waits';

export class HomePage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Arama input'u için birkaç olası selector:
    this.searchInput = page.locator('input[name="search"]')
      .or(page.locator('input[type="search"]'))
      .or(page.locator('input[placeholder*="Ara"], input[aria-label*="Ara"]'));

    // Arama butonu
    this.searchButton = page.locator('button[type="submit"]')
      .or(page.locator('button[aria-label*="Ara"], button:has-text("Ara")'));
  }

  async goto() {
    await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    await waitForNetworkIdle(this.page);
    // Cookie/kvkk popup'ı olursa kapatmayı dene (kırılgan olabilir)
    const acceptCookies = this.page.locator('button:has-text("Kabul"), button:has-text("Kabul Et"), button:has-text("Accept")');
    if (await acceptCookies.first().isVisible().catch(() => false)) {
      await acceptCookies.first().click().catch(() => {});
    }
  }

  async search(term: string) {
    await expect(this.searchInput).toBeVisible();
    await this.searchInput.fill(term);
    await this.searchInput.press('Enter').catch(async () => {
      if (await this.searchButton.first().isVisible().catch(() => false)) {
        await this.searchButton.first().click();
      }
    });
    await waitForNetworkIdle(this.page);
  }
}
