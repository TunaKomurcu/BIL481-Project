<!-- Filename: Quality_Assurance_Plan.md -->

# Quality Assurance (QA) Plan

## List of Contributors
- **Tuna Kömürcü**
- **Arda Günaydın**
- **Mustafa Giray Akın**

## Table of Contents
1. [List of Contributors](#list-of-contributors)
2. [Table of Contents](#table-of-contents)
3. [Task Matrix](#task-matrix)
4. [1. Quality Assurance Strategy](#1-quality-assurance-strategy)
   - [Overview](#overview)
   - [Testing Methodologies](#testing-methodologies)
   - [Automated vs. Manual Testing](#automated-vs-manual-testing)
5. [2. Quality Factors & Metrics](#2-quality-factors--metrics)
6. [3. Test Plan](#3-test-plan)
   - [Test Cases](#test-cases)
   - [Bug Tracking](#bug-tracking)
7. [Submission Requirements & Final Demo](#submission-requirements--final-demo)

## Task Matrix (Document Preparation)

| Contributor          | Role in Document Preparation                   | Contribution                                               |
|----------------------|------------------------------------------------|------------------------------------------------------------|
| Tuna Kömürcü         | Algoritma ve Test Stratejileri Dokümantasyonu    | Test planı genel yapısı ve algoritma doğrulama senaryoları   |
| Arda Günaydın        | GUI & Kullanıcı Deneyimi Test Dokümantasyonu     | Kullanıcı arayüzü test case’leri ve kullanılabilirlik incelemesi |
| Mustafa Giray Akın   | Database & Entegrasyon Test Dokümantasyonu       | Veri yönetimi, API entegrasyon test case’leri ve raporlama    |

---

## 1. Quality Assurance Strategy

### Overview
Bu plan, Yatırım Asistanı uygulamasının yazılım kalitesini güvence altına almak için kullanılacak test stratejilerini ve süreçlerini tanımlar. Amaç, uygulamanın güvenilir, performanslı ve kullanıcı dostu olduğundan emin olmaktır.

### Testing Methodologies
- **Unit Testing:** Her modülün fonksiyonel doğruluğunu test etmek.
- **Integration Testing:** Farklı modüllerin entegrasyonunun sorunsuz çalıştığını doğrulamak.
- **Usability Testing:** Kullanıcı deneyiminin ve arayüzlerin test edilmesi.
- **Regression Testing:** Yeni güncellemelerin mevcut fonksiyonları etkilemediğini kontrol etmek.

### Automated vs. Manual Testing
- **Otomatik Testler:** 
  - Birim testleri (örneğin, Jest, PyTest)
  - Entegrasyon testleri (CI/CD süreçleriyle)
- **Manuel Testler:** 
  - Kullanıcı arayüzü ve kullanılabilirlik testleri
  - Son kullanıcı deneyimi testi

---

## 2. Quality Factors & Metrics

Aşağıdaki tablo, proje için belirlenen kalite faktörleri, açıklamaları ve ölçüm metriklerini göstermektedir:

| Quality Factor  | Description                                            | Measurement Metric                                      |
|-----------------|--------------------------------------------------------|---------------------------------------------------------|
| Performance     | Sistemin yanıt süresi ve işlem kapasitesi              | Kullanıcının belirlediği maksimum zaman sınırı içerisinde sonuç üretme  |
| Security        | Sistemin güvenlik açıklarına karşı dayanıklılığı         | Tespit edilen güvenlik açıkları sayısı                  |
| Usability       | Kullanıcı dostu arayüz ve kullanım kolaylığı             | Kullanıcı memnuniyeti anket skoru                       |
| Maintainability | Kod tabanının modifiye edilebilirliği ve okunabilirliği    | Kod karmaşıklığı (ör. Cyclomatic Complexity)            |

---

## 3. Test Plan

### Test Cases

1. **TC-01: Yatırım Girdisi Doğrulama**  
   - **Açıklama:** Kullanıcının yatırım miktarı, risk ve vade bilgilerini girdiği formun doğru çalıştığı test edilecek.  
   - **Beklenen Sonuç:** Geçerli değerler girildiğinde, sistem doğru şekilde API’ye istek göndermeli ve yanıt almalıdır.

2. **TC-02: Yapay Zeka Portföy Analizi**  
   - **Açıklama:** Girilen yatırım bilgilerine göre portföy analiz modülünün doğru hesaplamaları yapıp yapmadığı kontrol edilecek.  
   - **Beklenen Sonuç:** Analiz sonucunda, mantıklı portföy dağılımları ve gelir tahmini üretilmelidir.

3. **TC-03: Grafiksel Görselleştirme**  
   - **Açıklama:** Analiz sonuçlarının grafik ve çizelge olarak kullanıcıya doğru sunulup sunulmadığı test edilecek.  
   - **Beklenen Sonuç:** Grafikler doğru verilerle oluşturulmalı ve kullanıcıya düzgün bir şekilde gösterilmelidir.

4. **TC-04: PDF Rapor İndirme Fonksiyonu**  
   - **Açıklama:** Kullanıcının analiz sonuçlarını PDF formatında indirip indiremediği test edilecek.  
   - **Beklenen Sonuç:** PDF oluşturma başarılı olmalı, indirilen dosya tüm bilgileri içermelidir.

5. **TC-05: Performans Testi**  
   - **Açıklama:** Kullanıcı girdilerinin işlenmesi ve grafiklerin oluşturulmasının, kullanıcının belirlediği maksimum zaman sınırı içerisinde gerçekleşip gerçekleşmediği test edilecek.  
   - **Beklenen Sonuç:** Girdiler, kullanıcının belirlediği maksimum zaman sınırı içerisinde işlenip sonuç üretilmelidir.

### Bug Tracking
- **Araç:** GitHub Issues üzerinden tüm hata raporları takip edilecektir.
- **Süreç:** 
  - Hata tespit edildiğinde, ilgili test case’e referans verilerek issue açılacak.
  - Her hata için sorumlu ekip üyesi atanacak ve commit’ler ile çözüm süreci takip edilecektir.
  - Hata düzeltmeleri sonrası, ilgili test case yeniden çalıştırılarak doğrulama yapılacaktır.

---

## Submission Requirements & Final Demo

- **GitHub Upload:** Tüm dokümanlar ve kodlar GitHub deposuna yüklenecektir.
- **Commit Messages:** Her commit, yapılan değişiklikleri net bir şekilde ifade edecek açıklamalara sahip olacaktır.
- **Final Demo:**  
  Final sunumunda, test planında detaylandırılmış test case’lerin sonuçları referans alınarak, temel use case’lerin işlevselliği canlı olarak gösterilecektir.  
  *Not: Test case’ler, implementasyonun doğrulanması için kullanılır; final demo esas olarak kullanıcı senaryolarının (use case) tam işleyişini ortaya koyacaktır.*
