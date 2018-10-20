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
  displayProducts();
});

//Function that displays all items in the product table
const displayProducts = function (){
  let query = "Select * FROM products";
  connection.query(query, function(err, res) {
    if (err) throw err;

    for (var i = 0; i < res.length; i++)
      //Logs the item id, name, and price of each item in the table
      console.log("Product ID: " + res[i].item_id + " || Product Name: " + res[i].product_name + " || Price: " + res[i].price);
      userChoice();
    });
};


const userChoice = function () {
    inquirer.prompt([
      {
        //Inquirer prompt asking user which unit they would like to buy
        name: 'product_ID',
        type: 'input',
        message: 'What item_id were you interested in buying?',
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
            return false;
        }
      },
      {
        //Inquirer prompt asking user how many items of [id] they would like to buy
        name: "buy_amount",
        type: "input",
        message: "How many of the item did you want to buy?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
            return false;
        }
      }
    ]).then(function(answer) {
      //Query the database for the selected product_ID
      let query = "SELECT stock_quantity, price, department_name FROM products WHERE ?";
      connection.query(query, { item_id: answer.product_ID}, function(err, res) {
        if (err) throw err;

        //Sets variables for later use in determining if sufficient quantity exists and displaying cost to user
        let available_Stock = res[0].stock_quantity;
        let price_per_unit = res[0].price;
        //Department is defined here for use in the bamazonSupervisor.js
        //let department = res[0].department_name;

        //Checks the available stock against the users request of units

        if (available_Stock >= answer.buy_amount) {

          //Shows user the item bought, quantity bought and total price of purchase
          let totalPurchase = answer.buy_amount * price_per_unit;
          console.log("You have purchased " + answer.buy_amount + " units of Product ID " + answer.product_ID);
          console.log("Total cost of your purchase is $" + totalPurchase);
          console.log("------------");

          //Update the database for the new quantity left in inventory
          
        } 
        else {
          console.log("Insufficient Quantity!");
          console.log("------------");
          displayProducts();
        }
      });
    });
};
  




