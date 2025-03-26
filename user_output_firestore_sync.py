from datetime import datetime, timezone
import firebase_admin
from firebase_admin import credentials, firestore
import mysql.connector
import os
import json
import schedule
import time


cert_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "firebase_key_new.json")
cred = credentials.Certificate(cert_path)
firebase_admin.initialize_app(cred)
db = firestore.client()


def connect_to_mysql():
    try:
        conn = mysql.connector.connect(
            host="localhost",
            user="root",
            password="password",
            database="main"
        )
        return conn if conn.is_connected() else None
    except mysql.connector.Error as err:
        print("Hata")
        return None


def get_all_firestore_users():
    users_ref = db.collection("user_output").stream()
    users = {}

    for doc in users_ref:
        data = doc.to_dict()

        
        if "updated_at" in data and isinstance(data["updated_at"], datetime):
            data["updated_at"] = data["updated_at"].replace(tzinfo=timezone.utc)
        else:
            data["updated_at"] = datetime.min.replace(tzinfo=timezone.utc)  

        users[doc.id] = data
    return users


def get_all_mysql_users(conn):
    if conn is None:
        return {}

    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM user_output")
    users = {}
    for row in cursor.fetchall():
        row["updated_at"] = row["updated_at"].replace(tzinfo=timezone.utc) if row["updated_at"] else datetime.min.replace(tzinfo=timezone.utc)
        users[row["user_mail"]] = row

    cursor.close()
    return users


def sync_data():
    conn = connect_to_mysql()
    if conn is None:
        return

    try:
        cursor = conn.cursor()

        mysql_users = get_all_mysql_users(conn)
        firestore_users = get_all_firestore_users()

        
        for user_mail, data in firestore_users.items():
            cursor.execute("SELECT updated_at FROM user_output WHERE user_mail = %s", (user_mail,))
            mysql_record = cursor.fetchone()

            if mysql_record:
                mysql_updated_at = mysql_record[0].replace(tzinfo=timezone.utc)
                firestore_updated_at = data["updated_at"]

                
                firestore_updated_at_str = firestore_updated_at.strftime('%Y-%m-%d %H:%M:%S')

                if firestore_updated_at > mysql_updated_at:
                    
                    cursor.execute(
                        "UPDATE user_output SET user_pdf_link = %s, user_recommendation = %s, updated_at = %s WHERE user_mail = %s",
                        (data["user_pdf_link"], data["user_recommendation"], firestore_updated_at_str, user_mail)
                    )
            else:
                
                firestore_updated_at_str = data["updated_at"].strftime('%Y-%m-%d %H:%M:%S')

                cursor.execute(
                    "INSERT INTO user_output (user_mail, user_pdf_link, user_recommendation, updated_at) VALUES (%s, %s, %s, %s)",
                    (user_mail, data["user_pdf_link"], data["user_recommendation"], firestore_updated_at_str)
                )

        
        for user_mail, data in mysql_users.items():
            doc_ref = db.collection("user_output").document(user_mail)
            doc = doc_ref.get()

            if doc.exists:
                firestore_data = doc.to_dict()
                firestore_updated_at = firestore_data["updated_at"]

                if data["updated_at"] > firestore_updated_at:
                    
                    doc_ref.update({
                        "user_pdf_link": data["user_pdf_link"],
                        "user_recommendation": data["user_recommendation"],
                        "updated_at": data["updated_at"]
                    })
            else:
                
                doc_ref.set({
                    "user_mail": user_mail,
                    "user_pdf_link": data["user_pdf_link"],
                    "user_recommendation": data["user_recommendation"],
                    "updated_at": data["updated_at"]
                })

        
        for user_mail in mysql_users.keys():
            if user_mail not in firestore_users:
                
                cursor.execute("DELETE FROM user_output WHERE user_mail = %s", (user_mail,))

        
        for user_mail in firestore_users.keys():
            if user_mail not in mysql_users:
                
                db.collection("user_output").document(user_mail).delete()

        conn.commit()
        

    except mysql.connector.Error as err:
        print("MySQL Hatası")
        conn.rollback()
    
    finally:
        cursor.close()
        conn.close()


schedule.every(10).seconds.do(sync_data)



while True:
    schedule.run_pending()
    time.sleep(5)
