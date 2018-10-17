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
  connection.query("SELECT * FROM products", function(err, res){ 
    if (err) throw err;
    inquirer.prompt([
      {
        //Inquirer prompt asking user which unit they would like to buy
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
        //Inquirer prompt asking user how many items of [id] they would like to buy
        name: "amount",
        type: "input",
        message: "How many of the item did you want to buy?"
      }
    ])
    .then(function(answer) {
      //Sets chosenItem equal to the user choices res
      let chosenItem;
      for (var i = 0; i < res.length; i++) {
        if (res[i].item_id === answer.choice) {
          chosenItem = res[i];
        }
      }
      //Determines if the store has sufficient quantity to fulfill the order
      if (chosenItem.stock_quantity >= parseInt(answer.amount)) {
        connection.query(
          //Updates the products table to reflect the new quantity after the sucessful sale
          "UPDATE products SET ? WHERE ?",
        [
          {
            stock_quantity: answer.amount
          },
          {
            item_id: chosenItem.item_id
          }
        ],
          function(err) {
            if(err) throw err;
            console.log("Sale was successful");
            //Shows the user their total purchase price
            console.log("------------------");
            displayProducts();
          }
        );
      }
      else {
          //If stock_quantity is not sufficient to fulfill the user order, displays Insufficient Quantity!
          console.log("Insufficient Quantity!");
          displayProducts();
      }
    });
  });  
}
  




