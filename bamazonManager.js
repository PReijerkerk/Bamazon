//Requires packages for mysql and inquirer
var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
const connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "",
    database: "bamazon_DB",
  });

  // connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    //Calls function to select manager action
    selectAction();
});

const selectAction = function() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What function would you like to do?',
            choices: [
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product"
            ]
        }
    ]).then(function(answer) {
        //Switch statement based off the selected action
        switch (answer.action) {
            case "View Products for Sale":
                viewProducts();
                console.log("------------");
                break;

            case "View Low Inventory":
                viewLowInventory();
                console.log("------------");
                break;

            case "Add to Inventory":
                addInventory();
                break;

            case "Add New Product":
                addProduct();
                break;
        }
    });
};

//Displays list of all available products
const viewProducts = function() {
    let query = "SELECT * FROM products";
    connection.query(query, function(err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        //Logs the item id, name, price and quantity of each item in the table
        console.log("Product ID: " + res[i].item_id + " || Product Name: " + res[i].product_name + " || Price: " + res[i].price + " || Quantity: " + res[i].stock_quantity);
        }
        console.log("------------");
        //Allows user to select another action
        selectAction();
    });
};

//Displays list of all products with low stock quantity
const viewLowInventory = function() {
    let query = "SELECT item_id, product_name, stock_quantity FROM products WHERE stock_quantity < 5";
    connection.query(query, function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
             //Logs the item id, name, and quantity of each item in the table
            console.log("Product ID: " + res[i].item_id + " || Product Name: " + res[i].product_name +  " || Quantity: " + res[i].stock_quantity);
        }
        console.log("------------");
        //Allows user to select another action
        selectAction();
    });
};

//Adds stock to an existing product in the database
const addInventory = function() {
    inquirer.prompt([
        {
            name: 'product_ID',
            type: 'input',
            message: 'What product ID would you like to add stock to?'
        },
        {
            name: 'stock_amount',
            type: 'input',
            message: 'How much stock would you like to add?'
        }
    ]).then(function(answer) {
        //Pushes stock update to the database
        connection.query("SELECT * FROM products", function(err, res) {
            let chosenItem;

            //Grabs the product from the database that manager has chosen to update
            for (var i = 0; i < res.length; i++) {
                if (res[i].item_id === parseInt(answer.product_ID)) {
                    chosenItem = res[i];
                }
            }

            //Adds new stock quantity to the existing stock quantity
            let updateStock = parseInt(chosenItem.stock_quantity) + parseInt(answer.stock_amount);
            console.log("Updated stock quantity: " + updateStock);

            //Updates stock amount in the database
            connection.query("UPDATE products SET ? WHERE ?", [{
                stock_quantity: updateStock
            }, {
                item_id: answer.product_ID
            }], function(err, res) {
                if (err) {
                    throw err;
                } else {
                console.log("------------");
                //Lets user select a new action
                selectAction();
                }
            });
        });
    });
};

//Adds a new product to the database
const addProduct = function () {
    inquirer.prompt ([
        {
            name: 'product_name',
            type: 'input',
            message: 'What is the name of the new product you are adding?'
        },
        {
            name: 'department_name',
            type: 'input',
            message: 'What department is the new product from?'
        },
        {
            name: 'price',
            type: 'input',
            message: "What is the price of this new product?"
        },
        {
            name: 'stock_quantity',
            type: 'input',
            message: 'What is the current quantity of this new product?'
        }
    ]).then(function(answer) {
        //Inserts the users inputs into the database products table
        connection.query("INSERT INTO products SET ?", {
            product_name: answer.product_name,
            department_name: answer.department_name,
            price: answer.price,
            stock_quantity: answer.stock_quantity
        }, function(err, res) {
            if (err) {
                throw err;
            } else {
                console.log("Product added sucessfully!");
                console.log("------------");
                //Lets user select a new action
                selectAction();
            }
        });
    });
};