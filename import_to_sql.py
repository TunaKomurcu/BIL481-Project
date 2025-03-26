import mysql.connector


conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="b4Cd0_0R_/Syl3*@1nC3",   
    database="main"
)

cursor = conn.cursor()

def add_user():
    user_name = input("Kullanıcı Adı: ")
    user_mail = input("Kullanıcı Mail: ")
    user_total = int(input("Toplam Miktar: "))
    user_r_t = int(input("Risk Tolerans Değeri: "))
    user_maturity = int(input("Vade Değeri: "))

  
    query = """
    INSERT INTO users (user_name, user_mail, user_total, user_r_t, user_maturity)
    VALUES (%s, %s, %s, %s, %s)
    ON DUPLICATE KEY UPDATE 
    user_name = VALUES(user_name), 
    user_total = VALUES(user_total),
    user_r_t = VALUES(user_r_t),
    user_maturity = VALUES(user_maturity)
    """
    values = (user_name, user_mail, user_total, user_r_t, user_maturity)

    cursor.execute(query, values)
    conn.commit()  

    if cursor.rowcount == 1:
        print("eklendi")
    else:
        print("güncellendi")


add_user()
   

cursor.close()
conn.close()