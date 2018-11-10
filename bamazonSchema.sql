DROP DATABASE IF EXISTS bamazon_db;
CREATE database bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price INT default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)

VALUES ("Wok", "Kitchen Supplies", 30, 5),
	   ("Vans Old Skool", "Clothing", 60, 10),
       ("Pocket Knife", "Outdoor Supplies", 60, 8),
       ("Bose Headphones", "Entertainment", 350, 3),
       ("Armchair", "Furniture", 150, 2),
       ("Apple TV", "Entertainment", 150, 9),
       ("Motorcycle Jacket", "Clothing", 300, 3),
       ("French Press", "Kitchen Supplies", 22, 5),
       ("Ray Bans Sunglasses", "Accessories", 150, 2),
       ("Dutch Oven", "Kitchen Supplies", 50, 7);
       
       


SELECT * FROM products;