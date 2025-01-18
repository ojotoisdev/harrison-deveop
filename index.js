const readline = require('readline');

// Create an interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Product class
class Product {
    constructor(productName, price) {
        this.productName = productName;
        this.price = price;
    }

    static createProduct(callback) {
        rl.question("Enter product name: ", (productName) => {
            rl.question("Enter product price: $", (price) => {
                const product = new Product(productName, parseFloat(price));
                callback(product);
            });
        });
    }
}

// UserAccount class
class UserAccount {
    constructor(username, password, email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }

    static createAccount(callback) {
        rl.question("Enter username: ", (username) => {
            rl.question("Enter password: ", (password) => {
                rl.question("Enter email: ", (email) => {
                    const user = new UserAccount(username, password, email);
                    callback(user);
                });
            });
        });
    }

    displayAccountInfo() {
        console.log("Username: " + this.username);
        console.log("Email: " + this.email);
    }
}

// ShoppingCart class
class ShoppingCart {
    constructor() {
        this.cartItems = [];
    }

    addProduct(product) {
        this.cartItems.push(product);
    }

    displayCart() {
        console.log("Shopping Cart:");
        let total = 0;
        this.cartItems.forEach(product => {
            console.log(`${product.productName} - $${product.price}`);
            total += product.price;
        });
        console.log("Total: $" + total);
        return total;
    }

    static createShoppingCart() {
        return new ShoppingCart();
    }
}

// Payment class
class Payment {
    static processPayment(totalAmount) {
        rl.question("Enter payment amount: $", (payment) => {
            payment = parseFloat(payment);
            if (payment >= totalAmount) {
                console.log(`Payment successful! Change: $${(payment - totalAmount).toFixed(2)}`);
                rl.close();
            } else {
                console.log("Insufficient funds! Transaction failed.");
                rl.close();
            }
        });
    }
}

// Main function to run the e-commerce flow
function runECommerceSystem() {
    // Create user account
    UserAccount.createAccount((user) => {
        user.displayAccountInfo();

        // Create shopping cart
        const cart = ShoppingCart.createShoppingCart();

        // Add products to shopping cart
        Product.createProduct((product1) => {
            cart.addProduct(product1);

            // Display cart and checkout
            const totalAmount = cart.displayCart();
            Payment.processPayment(totalAmount);
        });
    });
}

// Start the e-commerce system
runECommerceSystem();
