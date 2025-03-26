import firebase_admin
from firebase_admin import credentials, firestore
import mysql.connector
import time
import schedule
import json
import os


cert_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "firebase_key_new.json")

if not os.path.exists(cert_path):
    raise FileNotFoundError("Firebase JSON dosyası bulunamadı")

with open(cert_path, "r") as json_file:
    json_data = json.load(json_file)


if not firebase_admin._apps:
    cred = credentials.Certificate(cert_path)
    firebase_admin.initialize_app(cred)

db = firestore.client()
print("Firestore bağlantısı kuruldu")


def connect_to_mysql():
    try:
        conn = mysql.connector.connect(
            host="localhost",
            user="root",
            password="b4Cd0_0R_/Syl3*@1nC3",
            database="main",
            autocommit=True
        )
        return conn
    except mysql.connector.Error as err:
        print("MySQL Bağlantı Hatası")
        return None


def get_all_mysql_users():
    conn = connect_to_mysql()
    if conn is None:
        return {}

    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM users")
    users = {row["user_mail"]: row for row in cursor.fetchall()}
    
    cursor.close()
    conn.close()
    return users


def get_all_firestore_users():
    users_ref = db.collection("users").stream()
    return {doc.id: doc.to_dict() for doc in users_ref}


def get_all_mysql_user_outputs():
    conn = connect_to_mysql()
    if conn is None:
        return {}

    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM user_output")
    user_outputs = {row["user_mail"]: row for row in cursor.fetchall()}
    
    cursor.close()
    conn.close()
    return user_outputs


def get_all_firestore_user_outputs():
    outputs_ref = db.collection("user_output").stream()
    return {doc.id: doc.to_dict() for doc in outputs_ref}


def sync_data():
    conn = connect_to_mysql()
    if conn is None:
        return
    
    cursor = conn.cursor()
    mysql_users = get_all_mysql_users()
    firestore_users = get_all_firestore_users()

    
    for user_mail in firestore_users.keys():
        if user_mail not in mysql_users:
            print("MySQL'de bulunamadı")

            
    for user_mail, data in mysql_users.items():
        if user_mail not in firestore_users:
            print("{user_mail} Firestore'a ekleniyor...")
            db.collection("users").document(user_mail).set({
                "user_name": data["user_name"],
                "user_mail": data["user_mail"],
                "user_total": data["user_total"],
                "user_r_t": data["user_r_t"],
                "user_maturity": data["user_maturity"],
            })
            print("Firestore'a eklendi")

    
    for user_mail, data in firestore_users.items():
        if user_mail in mysql_users:
            mysql_data = mysql_users[user_mail]

            if (
                mysql_data["user_name"] != data["user_name"]
                or mysql_data["user_total"] != data["user_total"]
                or mysql_data["user_r_t"] != data["user_r_t"]
                or mysql_data["user_maturity"] != data["user_maturity"]
            ):
                cursor.execute(
                    "UPDATE users SET user_name = %s, user_total = %s, user_r_t = %s, user_maturity = %s WHERE user_mail = %s",
                    (data["user_name"], data["user_total"], data["user_r_t"], data["user_maturity"], user_mail)
                )
                

    conn.commit()
    cursor.close()
    conn.close()


def remove_duplicates():
    conn = connect_to_mysql()
    if conn is None:
        return

    cursor = conn.cursor()

    delete_query = """
        DELETE u1 FROM users u1
        JOIN (
            SELECT user_mail, MAX(id) AS latest_id
            FROM users
            GROUP BY user_mail
        ) u2 ON u1.user_mail = u2.user_mail
        WHERE u1.id <> u2.latest_id;
    """

    cursor.execute(delete_query)
    conn.commit()
    cursor.close()
    conn.close()
    


def delete_missing_entries():
    mysql_users = get_all_mysql_users()
    firestore_users = get_all_firestore_users()

    mysql_user_mails = set(mysql_users.keys())
    firestore_user_mails = set(firestore_users.keys())

    
    for user_mail in mysql_user_mails - firestore_user_mails:
        

        
        if user_mail not in get_all_mysql_users():
            continue  
        conn = connect_to_mysql()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM users WHERE user_mail = %s", (user_mail,))
        conn.commit()
        cursor.close()
        conn.close()
        

    
    for user_mail in firestore_user_mails - mysql_user_mails:
        
        if user_mail in get_all_firestore_users():  
            db.collection("users").document(user_mail).delete()
            



schedule.every(10).seconds.do(lambda: (sync_data(), delete_missing_entries()))  
schedule.every(20).seconds.do(remove_duplicates) 
schedule.every(30).seconds.do(delete_missing_entries)  



while True:
    schedule.run_pending()
    time.sleep(5)