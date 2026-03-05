import { Page, Locator, expect } from '@playwright/test';
import { waitForNetworkIdle } from '../utils/waits';

export class SearchResultsPage {
  readonly page: Page;
  readonly filtersOpenButton: Locator;
  readonly productCards: Locator;
  readonly breadcrumbOrTitle: Locator;

  constructor(page: Page) {
    this.page = page;

    // Filtre alanını açan buton/alan (mobil/desktop farklı olabilir)
    this.filtersOpenButton = page.locator('button:has-text("Filtre"), a:has-text("Filtre")')
      .or(page.locator('[data-test-id*="filter"]'));

    // Ürün kartları
    this.productCards = page.locator('[data-test-id="product-card"]')
      .or(page.locator('li[class*="productListContent"] a'))
      .or(page.locator('a[href*="/adidas-"], a[href*="/ayakkabi"]'));

    // Listeleme sayfası doğrulaması için başlık/crumb
    this.breadcrumbOrTitle = page.locator('h1')
      .or(page.locator('[data-test-id="searchResultSummary"]'))
      .or(page.locator('text=/adidas/i'));
  }

  async assertOpened() {
    await expect(this.breadcrumbOrTitle.first()).toBeVisible();
  }

  async openFilters() {
    if (await this.filtersOpenButton.first().isVisible().catch(() => false)) {
      await this.filtersOpenButton.first().click();
      await waitForNetworkIdle(this.page);
    }
  }

  async applyFilterByText(groupLabel: string, optionText: string) {
    // "Cinsiyet", "Renk" gibi başlıkları bulup ilgili seçeneği tıklar.
    // UI değişikliklerine dayanıklılık için esnek bir yaklaşım.
    const group = this.page.locator(`text=${groupLabel}`).first();
    if (await group.isVisible().catch(() => false)) {
      await group.click().catch(() => {});
    }

    const option = this.page.locator(`label:has-text("${optionText}")`)
      .or(this.page.locator(`text=${optionText}`))
      .first();

    await expect(option).toBeVisible();
    await option.click();
    await waitForNetworkIdle(this.page);
  }

  async setPriceRange(min: number, max: number) {
    // Fiyat aralığı input'ları farklı şekillerde olabilir.
    const minInput = this.page.locator('input[placeholder*="En düşük"], input[aria-label*="En düşük"], input[name*="min"]')
      .first();
    const maxInput = this.page.locator('input[placeholder*="En yüksek"], input[aria-label*="En yüksek"], input[name*="max"]')
      .first();

    if (await minInput.isVisible().catch(() => false) && await maxInput.isVisible().catch(() => false)) {
      await minInput.fill(String(min));
      await maxInput.fill(String(max));
      const applyBtn = this.page.locator('button:has-text("Uygula"), button:has-text("Apply")').first();
      if (await applyBtn.isVisible().catch(() => false)) {
        await applyBtn.click();
      } else {
        await maxInput.press('Enter').catch(() => {});
      }
      await waitForNetworkIdle(this.page);
    }
  }

  async assertResultsUpdated() {
    // Basit kontrol: ürün kartı sayısı > 0
    await expect(this.productCards.first()).toBeVisible();
  }

  async openRandomProduct() {
    const count = await this.productCards.count();
    const idx = Math.max(0, Math.min(count - 1, Math.floor(Math.random() * Math.max(count, 1))));
    const target = this.productCards.nth(idx);
    await expect(target).toBeVisible();
    await target.click();
    await waitForNetworkIdle(this.page);
  }
}
