import { Page, Locator, expect } from '@playwright/test';
import { waitForNetworkIdle } from '../utils/waits';

export class ProductDetailPage {
  readonly page: Page;
  readonly addToCartButton: Locator;
  readonly productTitle: Locator;
  readonly productPrice: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButton = page.locator('button:has-text("Sepete Ekle")')
      .or(page.locator('[data-test-id="addToCart"]'))
      .first();

    this.productTitle = page.locator('h1')
      .or(page.locator('[data-test-id="product-name"]'))
      .first();

    this.productPrice = page.locator('[data-test-id="price"]')
      .or(page.locator('div:has-text("TL")'))
      .first();
  }

  async captureBasicInfo() {
    await expect(this.productTitle).toBeVisible();
    const title = (await this.productTitle.textContent())?.trim() || '';
    const price = (await this.productPrice.textContent())?.trim() || '';
    return { title, price };
  }

  async addToCart() {
    await expect(this.addToCartButton).toBeVisible();
    await this.addToCartButton.click();
    await waitForNetworkIdle(this.page);
  }
}
