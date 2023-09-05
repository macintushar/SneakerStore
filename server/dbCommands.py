import sqlite3
con = sqlite3.connect("./db/SneakerStreet.db")
cur = con.cursor()
con.execute("CREATE TABLE IF NOT EXISTS users (user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_type TEXT NOT NULL, username TEXT NOT NULL, password TEXT NOT NULL, email TEXT NOT NULL, phone TEXT NOT NULL, first_name TEXT NOT NULL, last_name TEXT NOT NULL, address TEXT NOT NULL)")
cur.execute("INSERT INTO users values('1','Admin','Tushar','Tusharsk','tusharkumar91111@gmail.com',9110894405, 'TUshar', 'Selvakumar', '123, xYZ')")
con.commit()
con.close()