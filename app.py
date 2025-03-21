from flask import Flask, send_file, render_template
from io import BytesIO
from xhtml2pdf import pisa

# Import or define the logic module
app = Flask(__name__)
import logic

@app.route('/download-pdf', methods=['GET'])
def download_pdf():
    # PDF içeriği oluştur
    results = logic.run_all_optimizations(
        total_money=logic.default_total_money,
        risk_tolerance=logic.default_risk_tolerance,
        user_vade=logic.default_vade
    )
    pdf_content = render_template('pdf_template.html', results=results)
    
    # PDF'i oluştur ve belleğe yaz
    pdf_file = BytesIO()
    pisa_status = pisa.CreatePDF(pdf_content, dest=pdf_file)
    pdf_file.seek(0)

    if pisa_status.err:
        return "PDF oluşturulamadı", 500

    # PDF'i indirme olarak gönder
    return send_file(pdf_file, as_attachment=True, download_name="yatirim_tavsiyesi.pdf", mimetype='application/pdf')

if __name__ == '__main__':
    app.run(debug=True)
