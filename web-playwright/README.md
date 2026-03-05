# TEEDO Ödev 2 — Web Otomasyon Projesi (Playwright)

Bu proje, TEEDO **Web & APP Automation Cases** ödevindeki akışı **WEB** tarafında proje formatında uygular.
//Not: Hepsiburada anti-bot güvenlik katmanı otomasyon trafiklerini engellediği için canlı ortamda erişim kısıtlandı; aynı iş akışı stabil demo e-commerce ortamında doğrulandı.
## Senaryo (Ödev Akışı)
1. Hepsiburada ana sayfası açılır  
2. "Adidas ayakkabı" aranır  
3. Ürün listeleme sayfası doğrulanır  
4. Filtreler: Cinsiyet=Erkek, Renk=Beyaz, Numara=42, Fiyat=3000-5000  
5. Filtrelerin uygulanması + sonuçların güncellenmesi doğrulanır  
6. Rastgele bir ürün seçilir  
7. Ürün detayda **Sepete Ekle**  
8. **Login olmadan** sepete yönlenme (login zorunluluğu yok; "login olmadan devam et" akışı)  
9. Sepette ürün adı/fiyat/temel bilgi doğrulanır

> Not: Hepsiburada UI selector'ları zaman içinde değişebilir. Bu yüzden sayfa objelerinde birden fazla fallback selector yaklaşımı kullanıldı.
> Çalıştırmadan önce gerektiğinde selector'ları güncellemeniz beklenir.

## Kurulum
```bash
cd web-playwright
npm i
npx playwright install
```

## Çalıştırma
```bash
npm test
# veya
npm run test:headed
```

## Yapı (POM)
- `pages/` altında Page Object Model sınıfları
- `tests/e2e/` altında senaryonun uçtan uca testi
- `utils/` altında test verisi ve küçük yardımcılar

## Çevresel Değişkenler (Opsiyonel)
`.env` dosyası oluşturup `BASE_URL=https://www.hepsiburada.com` gibi override edebilirsiniz.
