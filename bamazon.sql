-- Used to make sure database builds from scratch while coding this assignment
DROP DATABASE IF EXISTS bamazon_DB;

-- Creates the database bamazon_DB
CREATE DATABASE bamazon_DB;

-- Makes sure all data is input into bamazon_DB
USE bamazon_DB;

-- Creates a table called products which will hold the products available on Bamazon
CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT(100) NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("The Very Hungry Caterpiller", "Books", 6.59, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Red Dead Redemption 2", "Video Games", 59.96, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hocus Pocus", "Movies", 2.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Frosted Mini-Wheats", "Breakfast Foods", 3.50, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Aspen Pet Oval", "Pets", 11.75, 300);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Joking Hazard", "Board Games", 25.00, 600);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Callaway 2017 Supersoft Golf Balls", "Sports", 21.49, 10000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Adult unisex bumble bee costume", "Clothing", 15.38, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Echo", "Electronics", 99.99, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("CamelBak", "Camping", 17.00, 200);