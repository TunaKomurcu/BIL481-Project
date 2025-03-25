# Yatırım Tavsiye Botu

Bu proje, yatırım tavsiyesi oluşturmak amacıyla optimize edilmiş bir yatırım dağılımı hesaplayan web uygulamasıdır. Kullanıcıdan alınan toplam para, risk toleransı, vade (ay) ve botun düşünme süresi parametrelerine göre, yatırım seçenekleri arasında en uygun dağılımı belirler. Sonuçlar grafik olarak görüntülenir ve ayrıca PDF raporu olarak indirilebilir.

## Özellikler

- **Kullanıcı Girdisi Doğrulama:**  
  Toplam para, risk toleransı, vade ve botun düşünme süresi gibi parametrelerin doğru aralıkta olup olmadığını kontrol eder. Hatalı giriş yapıldığında kullanıcıya uygun hata mesajı görüntülenir.
  
- **Optimizasyon Algoritması:**  
  DFS (Derinlik Öncelikli Arama) algoritması kullanılarak yatırım seçenekleri arasında en uygun dağılım hesaplanır.
  
- **Grafik Görselleştirme:**  
  Hesaplanan yatırım dağılımı Chart.js ile grafik üzerinde gösterilir.
  
- **PDF Rapor Oluşturma:**  
  Hesaplanan yatırım dağılımını PDF formatında rapor olarak indirebilirsiniz.

## Dosya Yapısı

- **app.py:**  
  Flask uygulamasının ana dosyası. Form verilerini alır, doğrulama işlemlerini gerçekleştirir, optimizasyonu çalıştırır ve sonuçları kullanıcıya sunar.

- **logic.py:**  
  Yatırım seçenekleri, optimizasyon algoritması ve DFS fonksiyonu gibi hesaplama işlemlerini içerir.

- **templates/index.html:**  
  Kullanıcı arayüzü şablonu. Kullanıcıdan parametreleri alır ve sonuçları grafik olarak sunar.

- **templates/pdf_template.html:**  
  PDF raporu oluşturulurken kullanılan şablon dosyası.

## Gereksinimler

Projeyi çalıştırabilmek için aşağıdaki bileşenlere ihtiyacınız var:

- **Python 3.6+**
- **Flask:** Web framework
- **pdfkit:** HTML'den PDF oluşturmak için kullanılan kütüphane
- **wkhtmltopdf:** pdfkit'in çalışabilmesi için gerekli olan bağımsız araç

## Kurulum

1. Depoyu Klonlayın veya İndirin

Terminal veya komut satırında aşağıdaki komutu çalıştırın:

bash:
git clone https://github.com/kullanici_adiniz/yatirim-tavsiye-botu.git
cd yatirim-tavsiye-botu

2. Sanal Ortam Oluşturun(Opsiyonel)

bash:
python -m venv venv

Oluşturduğunuz sanal ortamı aktive edin:

Linux/MacOS:
source venv/bin/activate

Windows:
venv\Scripts\activate

3. Gerekli Paketleri Yükleyin

pip install Flask pdfkit

4. wkhtmltopdf Kurulumu

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


### Notlar

Kullanıcı Girdisi Doğrulama:
app.py içindeki validate_inputs fonksiyonu, form verilerinin uygun olup olmadığını kontrol eder ve hatalı girişlerde kullanıcıya hata mesajı sunar.

Optimizasyon:
logic.py dosyasında yer alan DFS algoritması ile yatırım dağılımı hesaplanır.

PDF Oluşturma:
PDF rapor oluşturulurken wkhtmltopdf aracının doğru kurulduğundan emin olun.


### Lisans
Bu proje açık kaynaklıdır ve dilediğiniz gibi kullanılabilir, dağıtılabilir ve geliştirilebilir.
