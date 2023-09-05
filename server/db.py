import sqlite3  
  
def createTable():
    con = sqlite3.connect("/home/tushar/Projects/Snkr-Strt/db/SneakerStreet.db")  
    print("Database opened successfully")  
    con.execute("CREATE TABLE IF NOT EXISTS users (user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_type TEXT NOT NULL, username TEXT NOT NULL, password TEXT NOT NULL, email TEXT NOT NULL, phone TEXT NOT NULL, first_name TEXT NOT NULL, last_name TEXT NOT NULL, address TEXT NOT NULL)")
    con.execute("CREATE TABLE IF NOT EXISTS sellers (seller_id INTEGER PRIMARY KEY AUTOINCREMENT, company_name TEXT NOT NULL, company_description TEXT NOT NULL, user_id INTEGER NOT NULL, FOREIGN KEY (user_id) REFERENCES users(user_id))")
    con.execute("CREATE TABLE IF NOT EXISTS buyers (buyer_id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, FOREIGN KEY (user_id) REFERENCES users(user_id))")
    con.execute("CREATE TABLE IF NOT EXISTS admins (admin_id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, FOREIGN KEY (user_id) REFERENCES users(user_id))")
    con.execute("CREATE TABLE IF NOT EXISTS orders (order_id INTEGER PRIMARY KEY AUTOINCREMENT, order_date TEXT NOT NULL, total_amount NUMERIC(10,2) NOT NULL, status TEXT NOT NULL, buyer_id INTEGER NOT NULL, seller_id INTEGER NOT NULL, FOREIGN KEY (buyer_id) REFERENCES buyers(buyer_id), FOREIGN KEY (seller_id) REFERENCES sellers(seller_id))")
    con.execute("CREATE TABLE IF NOT EXISTS product_order (product_id INTEGER NOT NULL, order_id INTEGER NOT NULL, PRIMARY KEY (product_id, order_id), FOREIGN KEY (product_id) REFERENCES products(product_id), FOREIGN KEY (order_id) REFERENCES orders(order_id))")
    con.execute("CREATE TABLE IF NOT EXISTS products (product_id INTEGER PRIMARY KEY AUTOINCREMENT, product_name TEXT NOT NULL, description TEXT NOT NULL, image TEXT NOT NULL, current_price NUMERIC(10,2) NOT NULL, original_price NUMERIC(10,2) NOT NULL, discount NUMERIC(2,2) NOT NULL, brand TEXT NOT NULL, category TEXT NOT NULL, seller_id INTEGER NOT NULL, sku TEXT NOT NULL, short TEXT NOT NULL, FOREIGN KEY (seller_id) REFERENCES sellers(seller_id))")
    con.execute("CREATE TABLE IF NOT EXISTS inventory (inventory_id INTEGER PRIMARY KEY AUTOINCREMENT, product_id INTEGER NOT NULL, quantity INTEGER NOT NULL, FOREIGN KEY (product_id) REFERENCES products(product_id))")
    con.execute("CREATE TABLE IF NOT EXISTS colors (color TEXT PRIMARY KEY, created_at TEXT NOT NULL)")

    print("Tables created successfully")  
    con.close()

def getShoeData():
    con = sqlite3.connect("/home/tushar/Projects/Snkr-Strt/db/SneakerStreet.db")  
    print("Database opened successfully")  
    cur = con.cursor()
    cur.execute("SELECT * FROM products")
    data = cur.fetchall()

    print("Tables created successfully")  
    con.close()

    return data

def CreateNewProduct(product_name, description, image, current_price, original_price, discount, brand, category, seller_id, sku, short):
    con = sqlite3.connect("/home/tushar/Projects/Snkr-Strt/db/SneakerStreet.db")  
    cur = con.cursor()
    con.execute("INSERT INTO products(product_name, description, image, current_price, original_price, discount, brand, category, seller_id, sku, short) VALUES (?,?,?,?,?,?,?,?,?,?,?)", (product_name, description, image, current_price, original_price, discount, brand, category, seller_id, sku, short))
    con.commit()
    con.close()

    return ("Inserted data into table")

def GetProduct(productname):
    con = sqlite3.connect("/home/tushar/Projects/Snkr-Strt/db/SneakerStreet.db")  
    print("Database opened successfully")  
    print("Product name",productname)
    cur = con.cursor()
    cur.execute("SELECT * FROM products WHERE short = ?", (productname,))
    data = cur.fetchall()
    print(data)
    return (data)
    con.close()

def LoginAdmin(email,password):
    con = sqlite3.connect("/home/tushar/Projects/Snkr-Strt/db/SneakerStreet.db")
    cur = con.cursor()
    cur.execute("SELECT * FROM users WHERE email = ? AND password = ?", (email,password,))
    data = cur.fetchall()
    print(data[0])
    return (data)
