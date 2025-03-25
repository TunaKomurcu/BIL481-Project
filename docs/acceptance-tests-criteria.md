# Acceptance Tests and Acceptance Criteria

## List of Contributors
- **Tuna Kömürcü**
- **Arda Günaydın**
- **Mustafa Giray Akın**

## Table of Contents
1. [List of Contributors](#list-of-contributors)
2. [Task Matrix](#task-matrix)
3. [Acceptance Criteria](#acceptance-criteria)
4. [Acceptance Tests](#acceptance-tests)
   - [Test 1: Yatırım Girdisi Doğrulama](#test-1-yatırım-girdisi-doğrulama)
   - [Test 2: Yapay Zeka Portföy Analizi](#test-2-yapay-zeka-portföy-analizi)
   - [Test 3: Grafiksel Görselleştirme](#test-3-grafiksel-görselleştirme)
   - [Test 4: PDF Rapor İndirme](#test-4-pdf-rapor-indirme)
5. [Testlerin Açıklamaları](#testlerin-açıklamaları)

## Task Matrix

| Contributor          | Role in Document Preparation                 | Contribution                              |
|----------------------|--------------------------------------------|-------------------------------------------|
| Tuna Kömürcü         | 	Algoritma ve Test Stratejileri Dokümantasyonu | 	Test planı genel yapısı ve algoritma doğrulama senaryoları   |
| Arda Günaydın        | GUI & Kullanıcı Deneyimi Test Dokümantasyonu               | Kullanıcı arayüzü test case’leri ve kullanılabilirlik incelemesi       |
| Mustafa Giray Akın   | 	Database & Entegrasyon Test Dokümantasyonu       | Veri yönetimi, API entegrasyon test case’leri ve raporlama        |

---

## Acceptance Criteria

| Scenario                                | Acceptance Criteria |
|-----------------------------------------|------------------------------------------------------------------|
| Yatırım Girdisi Doğrulama               | Kullanıcının girdiği verilerin doğru alınması ve API'ye uygun şekilde iletilmesi. |
| Yapay Zeka Portföy Analizi             | Kullanıcı tercihleri baz alınarak doğru portföy analizinin yapılması. |
| Grafiksel Görselleştirme               | Grafiklerin eksiksiz, responsive ve doğru veri ile oluşturulması. |
| PDF Rapor İndirme                      | PDF dosyasının oluşturulup, eksiksiz ıçerikle indirilebilir olması. |

---

## Acceptance Tests

### Test 1: Yatırım Girdisi Doğrulama
- **Test Adı:** TC-01 Yatırım Girdisi Doğrulama
- **Girdi:** Kullanıcı, para miktarı, risk seviyesi ve vade bilgilerini girer.
- **Beklenen Sonuç:** Sistem, verileri doğrular ve API'ye uygun formatta iletir.
- **Sonuç:** Pass/Fail

### Test 2: Yapay Zeka Portföy Analizi
- **Test Adı:** TC-02 Yapay Zeka Portföy Analizi
- **Girdi:** Kullanıcının girdiği verilere göre portföy analiz modülü çalışır.
- **Beklenen Sonuç:** Mantıklı portföy dağılımları ve gelir tahmini oluşturulur.
- **Sonuç:** Pass/Fail

### Test 3: Grafiksel Görselleştirme
- **Test Adı:** TC-03 Grafiksel Görselleştirme
- **Girdi:** Analiz edilen veriler grafik olarak görüntülenir.
- **Beklenen Sonuç:** Grafikler eksiksiz, responsive ve doğru veriyle oluşturulur.
- **Sonuç:** Pass/Fail

### Test 4: PDF Rapor İndirme
- **Test Adı:** TC-04 PDF Rapor İndirme
- **Girdi:** Kullanıcı, PDF rapor indirme seçeneğini tıklar.
- **Beklenen Sonuç:** PDF oluşur, eksiksiz bilgileri içerir ve indirilebilir.
- **Sonuç:** Pass/Fail

---

## Testlerin Açıklamaları

### Test 1: Yatırım Girdisi Doğrulama
Bu test, kullanıcının verdiği girdilerin sistem tarafından doğru şekilde alındığını ve API formatına uygun olarak işlendiğini test eder. Kullanıcı doğru veri girdiğinde testin başarılı geçmesi beklenir.

### Test 2: Yapay Zeka Portföy Analizi
Bu test, sistemin kullanıcı girdilerine dayalı olarak uygun portföy analizi yapıp yapmadığını kontrol eder. Beklenen sonuç, gerçek finansal mantığa uygun bir portföy önerisinin oluşturulmasıdır.

### Test 3: Grafiksel Görselleştirme
Bu test, analiz edilen verilerin doğru şekilde grafiklere ve çizelgelere döküldüğünü test eder. Grafiklerin responsive ve gerçek zamanlı olarak kullanıcıya sunulması gerekir.

### Test 4: PDF Rapor İndirme
Bu test, sistemin analiz sonuçlarını PDF formatına eksiksiz bir şekilde aktarıp aktarılmadığını değerlendirir. Kullanıcının PDF dosyasını başarılı bir şekilde indirip görüntülemesi gerekir.

