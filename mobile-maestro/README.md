# TEEDO Ödev 2 — Mobil Otomasyon Projesi (Maestro)

Bu klasör, TEEDO Web & APP Automation Cases ödevindeki akışı **Android mobil uygulama** tarafında Maestro ile proje formatında uygular.

## Gereksinimler
- Android cihaz/emülatör
- Maestro kurulu: https://maestro.mobile.dev/ (kurulum yönergeleri resmi dokümanda)
- Hepsiburada Android uygulaması yüklü

## Çalıştırma
```bash
cd mobile-maestro
maestro test flows/01_search_and_filter_add_to_cart.yaml
```

## Önemli Not
- `appId` ve bazı element selector'ları cihaz/uygulama sürümüne göre değişebilir.
- Akış içinde kritik adımlar için `assertVisible` ve `waitForAnimationToEnd` gibi kontroller eklendi.
