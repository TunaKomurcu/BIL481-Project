# Document Authorship: Arda Günaydın

# Table of Contents


- [Table of Contents](#table-of-contents)
- [Functional Requirements](#functional-requirements)
- [Non-Functional Requirements](#non-functional-requirements)
- [Effort Estimations](#effort-estimations)
- [Task Assignments](#task-assignments)

# Functional Requirements

**1)**  Kullanıcı belirli bir para miktarı girebilir.

**2)**  Kullanıcı risk ve vade süresi belirleyebilir.

**3)**  Yapay zeka, kullanıcı tercihlerine göre uygun portföy dağılımları oluşturur.

**4)**  Yapay zeka, kullanıcının verdiği verilere göre yatırım önerileri verir.

**5)**  Yatırım önerileri grafikler ve çizelgelerle görselleştirilir.
 
**6)**  Yatırım önerilerini PDF dosyasına dönüştürülebilir.

**7)**  Kullanıcı belirli bir süre sonundaki potansiyel gelir tahminini görebilir.

**8)**  Program gerçek zamanlı piyasa verileri ile çalışamaz.

**9)**  Program alım-satım işlemleri yapamaz, sadece öneri verebilir.

**10)**  Kullanıcı tercihlerini istediği zaman eğiştirebilir.


# Non-Functional Requirements

**1)**  Program 5 saniye içinde kullanıcı girdisini işleyip analiz oluşturur.

**2)**  Program 3 saniye içinde grafik ve diğer görselleri oluşturur.

**3)**  Kullanıcı dostu bir arayüzü vardır.

**4)**  Veri kaybını önlemek için düzenli yedeklemeler yapar.

**5)**  Hata oranını minimize etmek için program sıkı testlerden geçicektir.

# Effort Estimations

**1) Requirements Gathering**

Database: 8 saat 

Algoritma: 12 saat

GUI: 10 saat

Toplam: 30 saat

Metod: Expert Judgment

**2) Design**

Database: 16 saat 

Algoritma: 24 saat

GUI: 20 saat

Toplam: 60 saat

Metod: Expert Judgment

**3) Development**

Database: 40 saat 

Algoritma: 80 saat

GUI: 60 saat

Toplam: 180 saat

Metod: Parametric Modeling

**4) Testing**

Database: 16 saat 

Algoritma: 32 saat

GUI: 24 saat

Toplam: 72 saat

Metod: Expert Judgment

**5) Deployment**

Database: 8 saat 

Algoritma: 16 saat

GUI: 12 saat

Toplam: 36 saat

Metod: Expert Judgment

**Toplam Saat: 360 saat | 45 person-day**


# Task Assignments

## Team Members and Roles

##### Tuna Kömürcü: Algoritma Tasarımı

##### Arda Günaydın: GUI

##### Mustafa Giray Akın: Database

## Task Matrix


| **Görev**                                    | **Database** (Mustafa Giray Akın)         | **Algoritma** (Tuna Kömürcü)          | **GUI** (Arda Günaydın)       |
|----------------------------------------------|----------------------------------|----------------------------------|----------------------------------|
| **1. Kullanıcı Girdisi İşleme**               | - Kullanıcı veri şeması tasarla  | - Kullanıcı girdilerini doğrula  | - Giriş formları oluştur (tutar, risk, vade) |
| **2. Portföy Oluşturma**                    | - Portföy şablonlarını sakla     | - Yapay zeka tabanlı dağılım yap | - Portföy seçeneklerini göster  |
| **3. Yatırım Önerileri**                    | - Öneri geçmişini sakla          | - Öneri mantığını geliştir       | - Kişiselleştirilmiş önerileri göster |
| **4. Grafik ve Çizelge Görselleştirme**     | - Görselleştirme için veriyi hazırla | - Grafik verilerini hesapla      | - Etkileşimli grafik ve çizelgeleri göster |
| **5. PDF Rapor Oluşturma**                  | - Oluşturulan raporları sakla    | - Verileri PDF için biçimlendir  | - Dışa aktarılabilir PDF tasarla |
| **6. Gelecek Gelir Tahmini**                | - Tahmin kayıtlarını sakla       | - Tahmin algoritmasını tasarla    | - Tahmini gelirleri göster      |
| **7. Tercih Yönetimi**                      | - Kullanıcı tercihlerini güncelle| - Önerileri tercihlere göre oluştur | - Tercih düzenleme arayüzü oluştur |
| **8. Veri Yedekleme**                       | - Otomatik yedekleme yap        | - Veri tutarlılığını sağla       | - Yedekleme durumu arayüzü oluştur |
| **9. Performans Optimizasyonu**             | - Veritabanı sorgularını hızlandır | - Yapay zeka işlemlerini optimize et | - Hızlı kullanıcı arayüzü sağla |
| **10. Hata Yönetimi ve Testler**            | - Veri bütünlüğünü test et       | - Algoritmaları doğrula          | - Kullanıcı arayüzü testleri yap |

##  Rationale for Task Assignment

Proje içi roller üyelerin yetenek, ilgi ve öğrenme hedeflerine göre verilmiştir. Görevler ise bu rollerin kapsamına göre belirlenmiştir.