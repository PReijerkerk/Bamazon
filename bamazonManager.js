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
                console.log("viewProducts");
                //viewProducts();
                break;

            case "View Low Inventory":
                console.log("ViewLowInventory");
                //viewLowInventory();
                break;

            case "Add to Inventory":
                console.log("AddToInventory");
                //addInventory();
                break;

            case "Add New Product":
                console.log("AddNewProduct");
                //addProduct();
                break;
        }
    });
};