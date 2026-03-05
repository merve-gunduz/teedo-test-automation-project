import { Page, Locator, expect } from '@playwright/test';
import { waitForNetworkIdle, expectUrlContains } from '../utils/waits';

export class CartPage {
  readonly page: Page;
  readonly cartItemTitle: Locator;
  readonly cartItemPrice: Locator;
  readonly loginPrompt: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItemTitle = page.locator('[data-test-id="basket-item-name"]')
      .or(page.locator('a:has-text("Adidas")'))
      .first();

    this.cartItemPrice = page.locator('[data-test-id="basket-item-price"]')
      .or(page.locator('text=/\bTL\b/'))
      .first();

    // "Giriş yap" gibi zorunlu login var mı kontrol etmek için:
    this.loginPrompt = page.locator('text=/giriş\s*yap|üye\s*ol|login/i').first();
  }

  async assertNavigatedToCart() {
    await waitForNetworkIdle(this.page);
    // URL genelde sepet/basket içerir
    await expectUrlContains(this.page, 'sepet|basket');
  }

  async assertNoForcedLogin() {
    // Login zorunluluğu olmamalı. Eğer login ekranına atarsa bu locator görünür olabilir.
    // Tamamen garantili değil ama pratik kontrol sağlar.
    const visible = await this.loginPrompt.isVisible().catch(() => false);
    expect(visible, 'Login zorunluluğu olmamalı (login prompt görünmemeli)').toBeFalsy();
  }

  async assertProductVisible(expectedTitle?: string) {
    await expect(this.cartItemTitle).toBeVisible();
    await expect(this.cartItemPrice).toBeVisible();
    if (expectedTitle) {
      const actual = (await this.cartItemTitle.textContent())?.toLowerCase() || '';
      expect(actual).toContain(expectedTitle.toLowerCase().slice(0, Math.min(10, expectedTitle.length)));
    }
  }
}
