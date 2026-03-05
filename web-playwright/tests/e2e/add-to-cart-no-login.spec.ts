import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { SearchResultsPage } from '../../pages/SearchResultsPage';
import { ProductDetailPage } from '../../pages/ProductDetailPage';
import { CartPage } from '../../pages/CartPage';
import { testData } from '../../utils/testData';

test.describe('Hepsiburada - Login olmadan sepete ekleme (Web)', () => {
  test('Adidas ayakkabı arama + filtreleme + sepete ekleme + sepet doğrulama', async ({ page }) => {
    const home = new HomePage(page);
    const results = new SearchResultsPage(page);
    const detail = new ProductDetailPage(page);
    const cart = new CartPage(page);

    
    await home.goto();

    
    await home.search(testData.searchTerm);

    
    await results.assertOpened();

    
    await results.openFilters();
    await results.applyFilterByText('Cinsiyet', testData.filters.gender);
    await results.applyFilterByText('Renk', testData.filters.color);
    await results.applyFilterByText('Numara', testData.filters.size);
    await results.setPriceRange(testData.filters.priceMin, testData.filters.priceMax);

    
    await results.assertResultsUpdated();

    
    await results.openRandomProduct();

    
    const info = await detail.captureBasicInfo();
    await detail.addToCart();

    
    const goToCart = page.locator('a:has-text("Sepete Git"), button:has-text("Sepete Git")').first();
    if (await goToCart.isVisible().catch(() => false)) {
      await goToCart.click();
    }

    // 10-11) Sepet doğrulama (login olmadan)
    await cart.assertNavigatedToCart();
    await cart.assertNoForcedLogin();
    await cart.assertProductVisible(info.title);
  });
});
