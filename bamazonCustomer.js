var mysql = require("mysql");
var inquirer = require("inquirer");

// set up connection to mysql server //
var connection = mysql.createConnection({
    host: "local host",
    port: 3306,
    user: "root",
    password: "",
    database: bamazon_db,

});

// set up variable for counting productTypes //

var productTypes = 0;

// connect to db // 

connection.connect(function (err) {
    if (err) throw err;

    new Promise(function (resolve, reject) {
        connection.query("SELECT * FROM products", function (err, res) {
            if (err) reject(err);
            resolve(res);
            console.log("Welcome to Bamazon! Here are our products:");
        });
        // console.log each item and increment number of products //
    }).then(function (result) {
        productTypes++;
        console.log("Item ID: " + item.item_id + " || Product Name: " + item.product_name + " || Price: " + item.price);

    });
    // enter stores //
}).then(function (result) {
    return enterStore();
    // catch err //
}).catch(function (err) {
    console.log(err);
});
// create enter store function //

function enterStore() {
    inquirer.prompt([{
        name: "entrance",
        message: "Would you like to start shopping?",
        type: "list",
        choices: ["Yes", "No"]

    }]).then(function (answer) {
        if (answer.entrance === "Yes") {
            menu();
        } else {
            console.log("Come back soon!");
            connection.destroy();
            return;
        }
    });
}

// create function for menu options //

function menu() {
    return inquirer.prompt([{
        name: "item",
        message: "Enter the item number of the product you wish to purchase.",
        type: "input",

        validate: function () {
            if ((isNaN(value) === false) && (value <= productTypes)) {
                return true;
            } else {
                console.log("\nPlease enter a valid ID.");
                return false;
            }
        }
    }, {
        name: "quantity",
        message: "How many would you like to purchase?",
        type: "input",

        validate: function () {
            if (isNAN(value) === false) {
                return true;
            } else {
                console.log("\nPlease enter a valid quantity.");
                return false;
            }
        }

    }]).then(function (answer) {
        return new Promise(function (resolve, reject) {

            connection.query("SELECT * FROM products WHERE ?", { item_id: answer.item }, function (err, res) {
                if (err) reject(err);
                resolve(res);
            });
            // if quantity valid save to local object, else console.log error //
        }).then(function (result) {
            var savedData = {};

            if (parseInt(answer.quantity) <= parseInt(result[0].stock_quantity)) {
                savedData.answer = answer;
                savedData.result = result;
            } else if (parseInt(answer.quantity) > parseInt(result[0].stock_quantity)) {
                console.log("This item is no longer available.");
            } else {
                console.log("An error occured. You are now exiting Bamazon. Your order is incomplete.");
            }
            return savedData;

        }).then(function (savedData) {
            if (savedData.answer) {
                var updatedQuantity = parseInt(savedData.result[0].stock_quantity) - parseInt(savedData.answer.quantity);
                var itemId = savedData.answer.item;
                var totalCost = parseInt(savedData.result[0].price) * parseInt(savedData.answer.quantity);
                connection.query('UPDATE products SET ? WHERE ?', [{
                    stock_quantity: updatedQuantity
                }, {
                    item_id: itemId
                }], function (err, res) {
                    if (err) throw err;
                    console.log('Your order total cost $' + totalCost + '. Thank you for shopping with Bamazon!');
                    connection.destroy();
                });
            } else {
                // Recursion to re-enter store
                enterStore();
            }
            // catch errors
        }).catch(function (err) {
            console.log(err);
            connection.destroy();
        });
        // catch errors
    }).catch(function (err) {
        console.log(err);
        connection.destroy();
    });


}




