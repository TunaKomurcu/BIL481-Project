Deployment Plan Document
======================================================================

## List of Contributors
- **Tuna Kömürcü**
- **Arda Günaydın**
- **Mustafa Giray Akın**

Table of Contents:
------------------
1. Deployment Overview
2. Deployment Process
3. Configuration Plan

----------------------------------------------------------------------
Task Matrix
----------------------------------------------------------------------
Aşağıda, dağıtım süreciyle ilgili görevlerin takibini gösteren bir tablo bulunmaktadır:

| **Task ID** | **Görev Açıklaması**                          | **Sorumlu**          | **Başlangıç Tarihi** | **Bitiş Tarihi** | **Durum**         |
|-------------|-----------------------------------------------|----------------------|----------------------|------------------|-------------------|
| DP-01       | Proje deposunun klonlanması ve indirilmesi     | Tuna Kömürcü         | 2025-03-10           | 2025-03-10       | Tamamlandı        |
| DP-02       | Sanal ortamın oluşturulması ve aktive edilmesi | Arda Günaydın        | 2025-03-11           | 2025-03-11       | Tamamlandı        |
| DP-03       | Gerekli paketlerin yüklenmesi                  | Mustafa Giray Akın   | 2025-03-12           | 2025-03-12       | Tamamlandı        |
| DP-04       | wkhtmltopdf kurulumu ve yapılandırılması       | Tuna Kömürcü         | 2025-03-13           | 2025-03-13       | Tamamlandı        |
| DP-05       | Uygulamanın çalıştırılması                     | Arda Günaydın        | 2025-03-14           | 2025-03-14       | Tamamlandı        |

----------------------------------------------------------------------
Deployment Overview
----------------------------------------------------------------------
Bu bölümde, demo sunumu için projenin dağıtımında izlenen genel yaklaşım, kullanılan araçlar ve ortam özetlenmiştir.

- **Genel Yaklaşım:**  
  Yatırım Tavsiye Botu, Flask tabanlı bir web uygulaması olarak geliştirilmiştir. Demo sunumu için projenin yerel bir geliştirme ortamında çalıştırılması hedeflenmiştir.
  

## Kullanılan Araçlar

Projeyi çalıştırabilmek için aşağıdaki bileşenlere ihtiyacınız var:

- **Python 3.6+**
- **Flask:** Web framework
- **pdfkit:** HTML'den PDF oluşturmak için kullanılan kütüphane
- **wkhtmltopdf:** pdfkit'in çalışabilmesi için gerekli olan bağımsız araç

----------------------------------------------------------------------
Deployment Process
----------------------------------------------------------------------

### 1. Depoyu Klonlayın veya İndirin

Terminal veya komut satırında aşağıdaki komutu çalıştırın:

bash:
git clone [https://github.com/kullanici_adiniz/yatirim-tavsiye-botu.git](https://github.com/TunaKomurcu/BIL481-Project)
cd yatirim-tavsiye-botu

### 2. Sanal Ortam Oluşturun(Opsiyonel)

bash:
python -m venv venv

Oluşturduğunuz sanal ortamı aktive edin:

Linux/MacOS:
source venv/bin/activate

Windows:
venv\Scripts\activate

### 3. Gerekli Paketleri Yükleyin

pip install Flask pdfkit

### 4. wkhtmltopdf Kurulumu

Windows:
wkhtmltopdf indir sayfasından uygun sürümü indirip kurun. Kurulum sırasında app.py içindeki wkhtmltopdf yolunu doğru olarak ayarlamayı unutmayın.

Linux/MacOS:
sudo apt-get install wkhtmltopdf


### Uygulamayı Çalıştırma

Visual Studio Code Kullanarak

VS Code'u Açın:
Proje klasörünüzü Visual Studio Code ile açın.

Terminali Açın ve Uygulamayı Başlatın:

Aşağıdaki komutu kullanarak Flask uygulamasını çalıştırın:
flask run

Tarayıcıdan Uygulamaya Erişin:
Terminalde belirtilen adres (genellikle http://127.0.0.1:5000) üzerinden uygulamayı görüntüleyin.

Kullanım
Form Üzerinden Parametre Girişi:

Toplam Para: Yatırım için kullanılacak toplam miktar.

Risk Toleransı: 1 ile 10 arasında (tamsayı) girilmelidir.

Vade (Ay): Yatırım süresinin ay cinsinden değeri (1 ile 10 arasında tamsayı).

Botun Düşünme Süresi: Optimizasyon algoritmasının çalışması için ayrılan süre (saniye).

Optimizasyonu Başlat:
Formu doldurup "Optimizasyonu Başlat" butonuna tıkladığınızda:

Geçersiz değer girilirse, sayfanın altında ilgili hata mesajı görüntülenecektir.

Doğru değerler girildiğinde, yatırım dağılımı hesaplanıp grafik üzerinde gösterilir.

PDF Rapor İndirme:
Hesaplanan sonuçların altında bulunan "PDF Olarak İndir" butonu ile raporu PDF formatında indirebilirsiniz.

----------------------------------------------------------------------
Configuration Plan
----------------------------------------------------------------------


## Flask Yapılandırması

- **Hata Ayıklama Modu:**  
  Uygulamanın geliştirme sürecinde hata ayıklama (debug) modunda çalıştırılması için yapılandırma yapılmıştır:
  ```python
  app = Flask(__name__)
  app.config['DEBUG'] = True

- **pdfkit Konfigürasyonu:** 
  import pdfkit
  config = pdfkit.configuration(wkhtmltopdf='C:\\Program Files\\wkhtmltopdf\\bin\\wkhtmltopdf.exe')
  pdf = pdfkit.from_string(rendered, False, configuration=config)

- **Sanal Ortam Kullanımı:**
  Proje, sanal ortam (venv) kullanılarak geliştirilmektedir. Sanal ortamın oluşturulması ve aktive edilmesi, aşağıdaki komutlarla yapılır:
  python -m venv venv
  # Linux/MacOS:
  source venv/bin/activate
  # Windows:
  venv\Scripts\activate

- **Ek Yapılandırmalar:**
  Loglama ve Hata Yönetimi:
  Uygulama, hata ayıklama modunda çalışırken oluşan logları takip edecek şekilde yapılandırılmıştır. Üretim ortamına geçişte loglama seviyeleri ve hata yönetimi stratejileri güncellenecektir.

  Performans Ayarları:
  Flask uygulamasının performansını artırmak için, gerekiyorsa multi-threading veya production server (örn. Gunicorn) kullanımı planlanmaktadır.

### Notlar

Kullanıcı Girdisi Doğrulama:
app.py içindeki validate_inputs fonksiyonu, form verilerinin uygun olup olmadığını kontrol eder ve hatalı girişlerde kullanıcıya hata mesajı sunar.

Optimizasyon:
logic.py dosyasında yer alan DFS algoritması ile yatırım dağılımı hesaplanır.

PDF Oluşturma:
PDF rapor oluşturulurken wkhtmltopdf aracının doğru kurulduğundan emin olun.
