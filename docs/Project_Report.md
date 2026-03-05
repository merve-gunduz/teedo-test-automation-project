# TEEDO Ödev 2 — Proje Teslim Raporu (Web & Mobile Ayrı)

 "Web & APP Automation Cases" ödevini **proje formatında**, **web ve mobil ayrı** olacak şekilde yapılandırır.

## 1) Ödevin Amacı
- Manuel test + test otomasyonu + kalite bakış açısını birlikte ele alarak **end-to-end test düşünme** yetkinliğini geliştirmek.
- Gerçek bir ürün senaryosu üzerinden **web** ve **mobil** otomasyon senaryoları tasarlayarak teoriyi pratiğe dökmek.

## 2) Hedeflenen Test Akışı
Ödev akışı (Web & Mobil) şu adımları içerir:
1. Hepsiburada ana sayfası açılır
2. "Adidas ayakkabı" aranır
3. Ürün listeleme sayfası doğrulanır
4. Filtreler uygulanır: Cinsiyet=Erkek, Renk=Beyaz, Numara=42, Fiyat=3000-5000
5. Filtrelerin doğru uygulandığı ve sonuçların güncellendiği doğrulanır
6. Herhangi bir ürün seçilir
7. Ürün detayda "Sepete Ekle" tıklanır
8. Kullanıcı login olmadan sepete yönlenir ("login olmadan devam et" akışı)
9. Sepette ürün adı/fiyat/temel bilgiler doğrulanır

## 3) Beklentiler (Değerlendirme Kriterleri)
- Web ve mobil platformlarda **aynı akışın** test edilmesi
- **Login zorunluluğu olmadan** sepete ekleme davranışının doğrulanması
- Web için **Playwright**, mobil (Android) için **Maestro**
- Otomasyon perspektifi:
  - Listeleme/filtre/fiyat aralığı gibi **dinamik elementlere yaklaşım**
  - Web vs mobil fark yaratabilecek noktaların ele alınması
  - **POM (Page Object Model)** yapısının kullanılması

## 4) Teslim İçeriği (Proje Yapısı)
Bu teslim iki ayrı otomasyon projesinden oluşur:

### 4.1 Web — Playwright Projesi (`web-playwright/`)
- POM klasörü: `pages/`
- Uçtan uca test: `tests/e2e/add-to-cart-no-login.spec.ts`
- Konfigürasyon: `playwright.config.ts`
- Yardımcılar ve test verisi: `utils/`

**Dinamik element yaklaşımı (Web):**
- Sabit sleep yerine `expect(...).toBeVisible()` + kontrollü `waitForLoadState` kullanımı
- Selector değişim riskine karşı fallback selector zinciri (ör: `locator(...).or(...)`)
- Listeleme sayfasında ürün kartlarının görünürlüğü ile sonuç güncelleme doğrulaması

### 4.2 Mobile — Maestro Projesi (`mobile-maestro/`)
- Akış dosyası: `flows/01_search_and_filter_add_to_cart.yaml`

**Dinamik element yaklaşımı (Mobile):**
- `waitForAnimationToEnd` ile geçişlerin stabilize edilmesi
- Kritik adımlarda `assertVisible` ile sayfa/aksiyon doğrulama
- Cihaz/uygulama sürümü farkına karşı bazı adımlarda `optional: true` kullanımı (gerekli yerlerde güçlendirilir)

## 5) Web vs Mobilde Fark Yaratabilecek Noktalar
- Web'de DOM selector ve network tabanlı beklemeler; mobilde erişilebilir metinler, view hiyerarşisi ve animasyon/bekleme yönetimi
- Popup/cookie izinleri web'de daha sık; mobilde izin/permission ekranları çıkabilir
- Filtre UI bileşenleri farklı olabilir: webde sidebar/drawer, mobilde bottom-sheet

## 6) Nasıl Çalıştırılır?
- Web: `web-playwright/README.md`
- Mobil: `mobile-maestro/README.md`

## 7) Varsayımlar / Notlar
- Hepsiburada arayüzü ve selector'lar zaman içinde değişebilir; bu nedenle proje, kolay güncellenebilir bir POM yapısıyla teslim edilmiştir.
- Mobilde `appId` uygulama paket adına göre yazılmıştır; cihazınızda farklıysa güncellenmelidir.

