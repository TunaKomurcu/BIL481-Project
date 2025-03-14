<!-- Filename: Design_Document.md -->

# Design Document

## List of Contributors
- **Tuna Kömürcü**
- **Arda Günaydın**
- **Mustafa Giray Akın**

## Table of Contents
1. [List of Contributors](#list-of-contributors)
2. [Table of Contents](#table-of-contents)
3. [Task Matrix](#task-matrix)
4. [1. System Overview](#1-system-overview)
   - [Brief Project Description](#brief-project-description)
   - [System Architecture](#system-architecture)
   - [Technology Stack](#technology-stack)
5. [2. Implementation Details](#2-implementation-details)
   - [Codebase Structure](#codebase-structure)
   - [Key Implementations](#key-implementations)
   - [Component Interfaces](#component-interfaces)
   - [Visual Interfaces](#visual-interfaces)
6. [3. Use Case Support in Design](#3-use-case-support-in-design)
   - [Use Case Selection](#use-case-selection)
   - [Requirement Mapping](#requirement-mapping)
   - [Use Case Design](#use-case-design)
   - [Demo Requirement](#demo-requirement)
7. [4. Design Decisions](#4-design-decisions)
   - [Technology Comparisons](#technology-comparisons)
   - [Decision Justifications](#decision-justifications)
8. [5. GitHub Commit Requirement](#5-github-commit-requirement)

## Task Matrix (Document Preparation)

| Contributor          | Role in Document Preparation                  | Contribution                                      |
|----------------------|-----------------------------------------------|---------------------------------------------------|
| Tuna Kömürcü         | Algoritma ve Sistem Mimarisi Dokümantasyonu    | Yapay zeka algoritmaları ve sistem genel tasarımı   |
| Arda Günaydın        | GUI & Visual Interfaces Dokümantasyonu         | Kullanıcı arayüzü, wireframe ve görsel açıklamalar  |
| Mustafa Giray Akın   | Database & Codebase Yapısı Dokümantasyonu        | Veri yapısı, kod organizasyonu ve entegrasyon detayları |

---

## 1. System Overview

### Brief Project Description
Yatırım Asistanı, kullanıcının belirlediği yatırım miktarı, risk oranı ve vade süresi gibi parametreler doğrultusunda en uygun yatırım portföyü önerilerini, yapay zeka destekli analizle sunan bir sistemdir. Bu sistem, bireysel yatırımcıların finansal karar süreçlerini kolaylaştırmayı hedefler.

Proje, kullanıcı girdilerini analiz eden, çeşitli algoritmalarla yatırım stratejileri oluşturan ve sonuçları grafiksel olarak sunan katmanlı bir mimariye sahiptir. Ayrıca, kullanıcının gelecekteki potansiyel gelir tahminlerini hesaplamaya yönelik modülleri içermektedir.

### System Architecture
Sistem, temel olarak aşağıdaki katmanlardan oluşmaktadır:
- **Kullanıcı Arayüzü (Frontend):** Kullanıcı girdilerini almak ve sonuçları görselleştirmek için etkileşimli web arayüzü.
- **İş Mantığı (Backend):** Yapay zeka analiz modülü, yatırım portföyü hesaplamaları ve veri işleme.
- **Veri Yönetimi:** Kullanıcı verileri, yedeklemeler ve dokümantasyon için kullanılan veritabanı yapısı (ör. Firebase).
- **Raporlama Modülü:** Grafiklerin oluşturulması ve PDF çıktı desteği.

### Technology Stack
- **Frontend:** React veya Angular
- **Backend:** Node.js / Python (Flask veya Django)
- **Veritabanı:** Firebase veya benzeri bulut tabanlı veritabanı
- **Yapay Zeka:** Limited Iterative DFS, Multi-beam Search vb. algoritmalar
- **Raporlama:** Chart.js, D3.js; PDF oluşturmak için jsPDF veya benzeri kütüphaneler

---

## 2. Implementation Details

### Codebase Structure
- **/components:** Kullanıcı arayüzü bileşenleri.
- **/services:** API çağrıları, yapay zeka modülü entegrasyonu.
- **/views:** Uygulama sayfaları ve görsel sunumlar.
- **/tests:** Birim ve entegrasyon testleri.

### Key Implementations
- **Kullanıcı Girdileri İşleme:** Yatırım miktarı, risk ve vade bilgilerini alan form modülü.
- **Portföy Analiz Algoritması:** Kullanıcı tercihlerini işleyerek, yapay zeka destekli portföy hesaplaması yapan modül.
- **Grafik ve Çizelge Oluşturma:** Sonuçların görsel olarak sunulması için veri görselleştirme bileşenleri.
- **PDF İndirme:** Analiz sonuçlarını PDF formatına dönüştüren modül.

### Component Interfaces
- **API Endpoint:** 
  - `POST /analyze`
    - **Input:** `{ amount: number, risk: string, term: string }`
    - **Output:** `{ portfolio: object, projectedIncome: number }`
- **Component Method Signatures:**
  - `analyzeInvestment(input: InvestmentInput): PortfolioOutput`
  - `generateChart(data: ChartData): void`

### Visual Interfaces
- Wireframe örnekleri ve UI mockup’ları, kullanıcı girdilerinin nasıl sunulacağını ve analiz sonuçlarının grafiksel temsillerini içermektedir.
- [Eklenen görsel referanslar GitHub deposunda "wireframes" klasöründe yer alacaktır.]

---

## 3. Use Case Support in Design

### Use Case Selection
1. **Yatırım Miktarı ve Tercihlerin Girilmesi**
2. **Yapay Zeka ile Portföy Analizi**
3. **Sonuçların Grafiksel Görselleştirilmesi**
4. **PDF Rapor İndirme & Potansiyel Gelir Tahmini**

### Requirement Mapping
- **Use Case 1:** Kullanıcı, belirli bir para miktarı girer (Functional Requirement 1, 2).
- **Use Case 2:** AI portföy dağılımı oluşturma (Functional Requirement 3, 4).
- **Use Case 3:** Grafik ve çizelgelerle sonuçların görselleştirilmesi (Functional Requirement 5).
- **Use Case 4:** PDF dosyasına dönüştürme ve gelir tahmini (Functional Requirement 6, 7).

### Use Case Design
- **Data Flow & Interaction:** 
  - Kullanıcı form aracılığıyla verileri girer.
  - Backend API, yapay zeka analizini çalıştırır.
  - Sonuçlar frontend üzerinde grafiksel olarak sunulur.
  - PDF oluşturma modülü, görselleştirilmiş sonuçları rapora dönüştürür.
- **State Changes:** Her kullanıcı girdisi sonrası sistem, veriyi işleyip, analizi ve sonuç üretimini tetikler.

### Demo Requirement
Final sunumunda, yukarıda belirtilen dört use case’in, ilgili test case’lerle doğrulanmış işlevsellikleriyle canlı olarak gösterilmesi gerekmektedir.  
*Not: Test planında yer alan test case’ler, implementasyon doğrulaması için kullanılırken, final demo esas olarak kullanıcı senaryolarının işleyişini ortaya koyacaktır.*

---

## 4. Design Decisions

### Technology Comparisons
- **Veritabanı:** Firebase vs. AWS DynamoDB  
  Firebase’in kolay kurulumu ve entegrasyon avantajı bulunurken, DynamoDB ölçeklenebilirlik açısından tercih edilebilir.
- **Frontend Framework:** React vs. Angular  
  React, daha modüler ve geniş topluluk desteğine sahiptir; Angular ise daha bütünleşik bir çözüm sunar.

### Decision Justifications
- **Veritabanı:** Firebase seçildi çünkü hızlı prototipleme ve ücretsiz bulut hizmeti sunması projenin gereksinimleriyle örtüşmektedir.
- **Frontend Framework:** React tercih edilerek, modüler yapı ve yeniden kullanılabilir bileşenler sayesinde geliştirme süresi kısaltılmıştır.
- **Backend & AI:** Python tabanlı çözümler (Flask/Django) ve Limited Iterative DFS, Multi-beam Search algoritmalarının entegrasyonu, yapay zeka modülünün esnek ve güçlü çalışmasını sağlamaktadır.

---

## 5. GitHub Commit Requirement

- **Kod Implementasyonları & Arayüzler:** Tüm uygulama kodları, bileşen tanımları ve görsel arayüz mockupları GitHub deposuna yüklenecektir.
- **Teknoloji Karşılaştırmaları:** Seçim aşamasında kullanılan kod örnekleri ve karşılaştırma notları da depo içerisinde commit mesajları ile detaylandırılacaktır.
- **Commit Messages:** Her commit, yapılan değişikliklerin açıkça anlaşılmasını sağlayacak şekilde açıklamalı mesajlar içerecektir.

