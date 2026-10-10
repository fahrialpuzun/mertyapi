# MertYapı Ücretsiz Teklif Alma Akışı

Bu çalışma mevcut React/Vite sitesine **sunucusuz ve ücretsiz**, mobil uyumlu bir `/teklif/` sayfası ekler.

- Müşteri iş türünü, ilçeyi ve yaklaşık ölçüyü seçer.
- Buton yalnızca WhatsApp'ta **hazır mesaj açar**. Mesaj müşteri tarafından gönderilene kadar MertYapı'ya ulaşmaz.
- Sitede müşteri bilgileri depolanmaz. Google E-Tablo entegrasyonu **henüz yoktur**. Teklifler WhatsApp görüşmesi olarak gelir.
- Mevcut telefon numarası `src/components/WhatsAppButton.tsx` dosyasındaki `wa.me/905365972833` adresinden alınmıştır. Yayına almadan önce işletme sahibinin doğrulaması önerilir.
- Ana sayfa ile kategori galerisinden teklif sayfasına bağlantılar eklenmiştir; var olan görseller korunmuştur.
- `robots.txt`, `sitemap.xml`, sayfa açıklamaları ve LocalBusiness temel yapılandırılmış verisi eklenmiştir.
- Fiyat, ücretsiz keşif, garanti veya teslimat süresi iddiası eklenmemiştir.

## Kontrol listesi

1. `npm ci && npm run build` çalıştırın.
2. Telefonda `/teklif/` sayfasını açın, mutfak ve gardırop kategorilerinden geçişi test edin.
3. Doldurup WhatsApp butonuna tıklayın; metnin doğru numaraya gittiğini doğrulayın; **gerçek müşteri gibi gönderme zorunlu değil**.
4. Vercel önizlemesinde `/teklif/`, `/robots.txt` ve `/sitemap.xml` adreslerini kontrol edin.
5. Onay verilirse PR'ı birleştirip Search Console'a sitemap gönderin, Google İşletme Profili web sitesi ve teklif adreslerini güncelleyin.

### Sınırlama
Bu düzen gelen ilgiyi teklife dönüştürmeye odaklanır. Tek başına Google'da üst sıraya çıkmayı ya da yeni müşteriyi garanti etmez. Düzenli gerçek işletme fotoğrafları, Google İşletme Profili ve müşteri yorumları önemli olmaya devam eder.
