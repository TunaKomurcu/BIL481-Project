from flask import Flask, render_template, request, make_response
import pdfkit
from logic import run_all_optimizations, investment_options

app = Flask(__name__)

def validate_inputs(form_data):
    """
    Form verilerindeki parametreleri kontrol eder.
    
    - Toplam Para: Sayısal olmak zorunda (boş bırakılırsa varsayılan 150000 kullanılır).
    - Risk Toleransı: 1 ile 10 arasında TAMSAYI olmalı.
    - Vade (ay): 1 ile 10 arasında TAMSAYI olmalı.
    - Botun Düşünme Süresi: Sayısal olmak zorunda.
    """
    error_message = None

    # Toplam Para
    total_money_str = form_data.get("total_money", "").strip()
    if total_money_str == "":
        total_money = 150000
    else:
        try:
            total_money = float(total_money_str)
        except ValueError:
            error_message = "Toplam Para sayısal bir değer olmalıdır."
            return None, error_message

    # Risk Toleransı
    risk_tolerance_str = form_data.get("risk_tolerance", "").strip()
    if risk_tolerance_str == "":
        risk_tolerance = 9
    else:
        try:
            risk_tolerance = float(risk_tolerance_str)
            if risk_tolerance != int(risk_tolerance) or not (1 <= risk_tolerance <= 10):
                error_message = "Risk Toleransı 1 ile 10 arasında bir tamsayı olmalıdır."
                return None, error_message
            risk_tolerance = int(risk_tolerance)
        except ValueError:
            error_message = "Risk Toleransı sayısal bir değer olmalıdır."
            return None, error_message

    # Vade (ay)
    user_vade_str = form_data.get("user_vade", "").strip()
    if user_vade_str == "":
        user_vade = 9
    else:
        try:
            user_vade = float(user_vade_str)
            if user_vade != int(user_vade) or not (1 <= user_vade <= 10):
                error_message = "Vade (ay) 1 ile 10 arasında bir tamsayı olmalıdır."
                return None, error_message
            user_vade = int(user_vade)
        except ValueError:
            error_message = "Vade (ay) sayısal bir değer olmalıdır."
            return None, error_message

    # Botun Düşünme Süresi (saniye)
    time_limit_dfs_str = form_data.get("time_limit_dfs", "").strip()
    if time_limit_dfs_str == "":
        time_limit_dfs = 5
    else:
        try:
            time_limit_dfs = float(time_limit_dfs_str)
        except ValueError:
            error_message = "Botun Düşünme Süresi sayısal bir değer olmalıdır."
            return None, error_message

    return (total_money, risk_tolerance, user_vade, time_limit_dfs), None

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        validated, error_message = validate_inputs(request.form)
        if error_message:
            # Hata mesajı varsa optimizasyon çalıştırılmadan sayfaya gönderiyoruz.
            return render_template("index.html",
                                   error_message=error_message,
                                   options=[],
                                   allocation=[],
                                   expected_yield=0,
                                   total_money=request.form.get("total_money", 150000),
                                   risk_tolerance=request.form.get("risk_tolerance", 9),
                                   user_vade=request.form.get("user_vade", 9),
                                   time_limit_dfs=request.form.get("time_limit_dfs", 5))
        total_money, risk_tolerance, user_vade, time_limit_dfs = validated

        result = run_all_optimizations(total_money, risk_tolerance, user_vade, time_limit_dfs)
        allocation, expected_yield = result.get("Limited DFS", (None, None))
        options = [opt["name"] for opt in investment_options]
        
        return render_template("index.html", 
                               error_message=None,
                               options=options, 
                               allocation=allocation, 
                               expected_yield=expected_yield,
                               total_money=total_money,
                               risk_tolerance=risk_tolerance,
                               user_vade=user_vade,
                               time_limit_dfs=time_limit_dfs)
    return render_template("index.html",
                           error_message=None,
                           options=[],
                           allocation=[],
                           expected_yield=0,
                           total_money=150000,
                           risk_tolerance=9,
                           user_vade=9,
                           time_limit_dfs=5)

@app.route("/download_pdf")
def download_pdf():
    # Parametreler query string üzerinden geldiği için benzer doğrulama yapıyoruz.
    form_data = {
        "total_money": request.args.get("total_money", ""),
        "risk_tolerance": request.args.get("risk_tolerance", ""),
        "user_vade": request.args.get("user_vade", ""),
        "time_limit_dfs": request.args.get("time_limit_dfs", "")
    }
    validated, error_message = validate_inputs(form_data)
    if error_message:
        return error_message  # PDF üretimi yerine hata mesajı döndürülüyor.
    total_money, risk_tolerance, user_vade, time_limit_dfs = validated
    
    result = run_all_optimizations(total_money, risk_tolerance, user_vade, time_limit_dfs)
    allocation, expected_yield = result.get("Limited DFS", (None, None))
    options = [opt["name"] for opt in investment_options]
    
    rendered = render_template(
        "pdf_template.html",
        options=options,
        allocation=allocation,
        expected_yield=expected_yield,
        total_money=total_money,
        risk_tolerance=risk_tolerance,
        user_vade=user_vade,
        zip=zip
    )
    
    config = pdfkit.configuration(wkhtmltopdf=r"C:\Program Files\wkhtmltopdf\bin\wkhtmltopdf.exe")
    pdf = pdfkit.from_string(rendered, False, configuration=config)
    
    response = make_response(pdf)
    response.headers["Content-Type"] = "application/pdf"
    response.headers["Content-Disposition"] = "attachment; filename=investment_report.pdf"
    return response

if __name__ == "__main__":
    app.run(debug=True)
