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
  console.log("This worked!");
  displayProducts();
  userChoice();
  connection.end();
});

//Function that displays all items in the product table
const displayProducts = function (){
  let query = "Select * FROM products";
  connection.query(query, function(err, res) {
    if (err) throw err;

    for (var i = 0; i < res.length; i++)
      //Logs the item id, name, and price of each item in the table
      console.log("Product ID: " + res[i].item_id + " || Product Name: " + res[i].product_name + " || Price: " + res[i].price);
  });
};

//Inquirer prompt asking user which unit they would like to buy
const userChoice = function () {
  connection.query("SELECT * FROM products", function(err, res){ 
    if (err) throw err;
    inquirer.prompt([
      {
        name: "choice",
        type: "rawlist",
        choices: function(){
          let choiceArray=[];
          for (var i = 0; i < res.length; i++) {
            choiceArray.push(res[i].item_id);
        }
        return choiceArray;
      },
        message: "What item_id were you interested in buying?"
        },
      {
        name: "amount",
        type: "input",
        message: "How many of the item did you want to buy?"
      }
    ])
    .then(function(answer) {
  
    })
  });
  
  };
  
//Inquirer prompt asking user how many items of [id] they would like to buy

//Checks the database to determine if stock_quantity for the [id] is enough to fulfill the order


//fulfills the customers order by updating the database for new stock_quantity and displays the users total purchase price

//If stock_quantity is not sufficient to fulfill the user order, displays Insufficient Quantity!

