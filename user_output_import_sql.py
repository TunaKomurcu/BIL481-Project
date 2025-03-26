import mysql.connector
import sys  

def connect_to_mysql():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="b4Cd0_0R_/Syl3*@1nC3",
        database="main"
    )

def save_user_details(user_mail, user_pdf_link, user_recommendation):
    conn = connect_to_mysql()
    cursor = conn.cursor()

    try:
        
        cursor.execute("SELECT * FROM users WHERE user_mail = %s", (user_mail,))
        user_exists = cursor.fetchone()

        if not user_exists:
            print("Veri eklenmedi.")
            sys.exit(1)  

        
        cursor.execute("SELECT * FROM user_output WHERE user_mail = %s", (user_mail,))
        existing_record = cursor.fetchone()

        if existing_record:
            
            query = """
            UPDATE user_output 
            SET user_pdf_link = %s, user_recommendation = %s 
            WHERE user_mail = %s
            """
            cursor.execute(query, (user_pdf_link, user_recommendation, user_mail))
            print("Güncellendi")
        else:
            
            query = """
            INSERT INTO user_output (user_mail, user_pdf_link, user_recommendation) 
            VALUES (%s, %s, %s)
            """
            cursor.execute(query, (user_mail, user_pdf_link, user_recommendation))
            print("Eklendi")

        conn.commit()

    except mysql.connector.Error as err:
        print("hata oluştu")

    finally:
        cursor.close()
        conn.close()
        


