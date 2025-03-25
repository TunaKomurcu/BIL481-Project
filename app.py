from flask import Flask, render_template, request, make_response
import pdfkit
from logic import run_all_optimizations, investment_options

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        try:
            total_money = float(request.form.get("total_money", 150000))
            risk_tolerance = float(request.form.get("risk_tolerance", 9))
            user_vade = float(request.form.get("user_vade", 9))
            time_limit_dfs = float(request.form.get("time_limit_dfs", 5))
        except ValueError:
            total_money, risk_tolerance, user_vade, time_limit_dfs = 150000, 9, 9, 5

        result = run_all_optimizations(total_money, risk_tolerance, user_vade, time_limit_dfs)
        allocation, expected_yield = result.get("Limited DFS", (None, None))
        options = [opt["name"] for opt in investment_options]
        
        return render_template("index.html", 
                               options=options, 
                               allocation=allocation, 
                               expected_yield=expected_yield,
                               total_money=total_money,
                               risk_tolerance=risk_tolerance,
                               user_vade=user_vade,
                               time_limit_dfs=time_limit_dfs)
    return render_template("index.html", options=[], allocation=[], expected_yield=0,
                           total_money=150000, risk_tolerance=9, user_vade=9, time_limit_dfs=5)

@app.route("/download_pdf")
def download_pdf():
    total_money = request.args.get("total_money", 150000, type=float)
    risk_tolerance = request.args.get("risk_tolerance", 9, type=float)
    user_vade = request.args.get("user_vade", 9, type=float)
    time_limit_dfs = request.args.get("time_limit_dfs", 5, type=float)
    
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
        zip=zip  # zip fonksiyonunu şablon ortamına geçiriyoruz.
    )
    
    config = pdfkit.configuration(wkhtmltopdf=r"C:\Program Files\wkhtmltopdf\bin\wkhtmltopdf.exe")
    pdf = pdfkit.from_string(rendered, False, configuration=config)
    
    response = make_response(pdf)
    response.headers["Content-Type"] = "application/pdf"
    response.headers["Content-Disposition"] = "attachment; filename=investment_report.pdf"
    return response


if __name__ == "__main__":
    app.run(debug=True)
