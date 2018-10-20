# Bamazon
A Node.js &amp; MySQL command line storefront app that tracks customer orders and depletes stock from a stores inventory.

## Third-party Node Modules

Bamazon uses these node modules: 
[`inquirer`](https://www.npmjs.com/package/inquirer), [`mysql`](https://www.npmjs.com/package/mysql).

These dependencies are available within the  [package.json](https://github.com/PReijerkerk/Bamazon/blob/master/package-lock.json).

## Customer Module

The customer module lets users select a product to purchase, enter the number of items they wish to purchase, and then complete the purchase.

The complete purchase process shows the total purchase price as well as the amount of units purchased.

To run this module in the terminal:

`node bamazonCustomer.js`

## Manager Module

The manager module lets managers view the list of products, view low inventory, add inventory, and add products.

New products will appear in the products table.

To run this module in the terminal:

`node bamazonManager.js`

## Future Improvements

### Supervisor Module

The supervisor module lets supervisors &amp; managers view overhead costs, product sales, and profit margins based off product departments.

