// ========================================
// PRODUCT DATA
// ========================================

const products = [

    {
        id: 1,
        name: "Floral Summer Dress",
        category: "dresses",
        gender: "women",
        price: 1299,
        image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 2,
        name: "Classic Shirts",
        category: "shirts",
        gender: "men",
        price: 899,
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 3,
        name: "Blue Denim Jeans",
        category: "jeans",
        gender: "women",
        price: 1499,
        image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 4,
        name: "Elegant Dresses",
        category: "dresses",
        gender: "women",
        price: 1799,
        image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 5,
        name: "Oversized Casual T-Shirt",
        category: "shirts",
        gender: "men",
        price: 699,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 6,
        name: "Women's Casual Top",
        category: "women",
        gender: "women",
        price: 799,
        image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 7,
        name: "Men's Casual Jacket",
        category: "men",
        gender: "men",
        price: 1999,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 8,
        name: "Classic Blue Jeans",
        category: "jeans",
        gender: "men",
        price: 1399,
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 9,
        name: "Party Dresses",
        category: "dresses",
        gender: "women",
        price: 1899,
        image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 10,
        name: "Premium Formal Shirt",
        category: "shirts",
        gender: "men",
        price: 1099,
        image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 11,
        name: "Women's Denim Jacket",
        category: "women",
        gender: "women",
        price: 1599,
        image: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 12,
        name: "Men's Black Jeans",
        category: "jeans",
        gender: "men",
        price: 1499,
        image: "https://images.unsplash.com/photo-1555689502-c4b22d76c56f?auto=format&fit=crop&w=700&q=80"
    }

];


// ========================================
// VARIABLES
// ========================================

let cart = [];

let wishlist = [];

let selectedCategory = "all";


// ========================================
// DISPLAY PRODUCTS
// ========================================

function displayProducts() {

    const container = document.getElementById("products");

    const searchText =
        document.getElementById("searchInput").value
        .toLowerCase();

    let filteredProducts = products.filter(product => {

        const matchesCategory =
            selectedCategory === "all" ||
            product.category === selectedCategory ||
            product.gender === selectedCategory;

        const matchesSearch =
            product.name
                .toLowerCase()
                .includes(searchText);

        return matchesCategory && matchesSearch;

    });


    container.innerHTML = "";


    if (filteredProducts.length === 0) {

        container.innerHTML = `
            <p style="grid-column:1/-1;text-align:center">
                No products found.
            </p>
        `;

        return;

    }


    filteredProducts.forEach(product => {

        const isWishlisted =
            wishlist.includes(product.id);

        container.innerHTML += `

            <div class="product">

                <div class="product-image">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                    >

                    <button
                        class="wishlist ${isWishlisted ? "active" : ""}"
                        onclick="toggleWishlist(${product.id})"
                    >
                        ${isWishlisted ? "♥" : "♡"}
                    </button>

                </div>


                <div class="product-info">

                    <div class="category-name">
                        ${product.category.toUpperCase()}
                    </div>

                    <h3>
                        ${product.name}
                    </h3>

                    <div class="price">
                        ₹${product.price.toLocaleString("en-IN")}
                    </div>

                    <button
                        class="add-cart"
                        onclick="addToCart(${product.id})"
                    >
                        Add to Cart
                    </button>

                </div>

            </div>

        `;

    });

}


// ========================================
// ADD TO CART
// ========================================

function addToCart(id) {

    const existingProduct =
        cart.find(item => item.id === id);


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            id: id,
            quantity: 1
        });

    }


    updateCart();

    openCart();

}


// ========================================
// UPDATE CART
// ========================================

function updateCart() {

    const cartItems =
        document.getElementById("cartItems");

    const cartCount =
        document.getElementById("cartCount");

    const cartTotal =
        document.getElementById("cartTotal");


    let totalItems = 0;

    let totalPrice = 0;


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

    } else {

        cartItems.innerHTML = "";


        cart.forEach(item => {

            const product =
                products.find(p => p.id === item.id);


            totalItems += item.quantity;

            totalPrice +=
                product.price * item.quantity;


            cartItems.innerHTML += `

                <div class="cart-item">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                    >

                    <div class="cart-item-info">

                        <h4>
                            ${product.name}
                        </h4>

                        <p>
                            ₹${product.price.toLocaleString("en-IN")}
                        </p>

                        <div class="quantity">

                            <button
                                onclick="changeQuantity(${product.id}, -1)"
                            >
                                −
                            </button>

                            <span>
                                ${item.quantity}
                            </span>

                            <button
                                onclick="changeQuantity(${product.id}, 1)"
                            >
                                +
                            </button>

                            <button
                                class="remove"
                                onclick="removeFromCart(${product.id})"
                            >
                                Remove
                            </button>

                        </div>

                    </div>

                </div>

            `;

        });

    }


    cartCount.textContent = totalItems;

    cartTotal.textContent =
        "₹" + totalPrice.toLocaleString("en-IN");

}


// ========================================
// CHANGE QUANTITY
// ========================================

function changeQuantity(id, amount) {

    const item =
        cart.find(item => item.id === id);


    if (!item) return;


    item.quantity += amount;


    if (item.quantity <= 0) {

        cart =
            cart.filter(item => item.id !== id);

    }


    updateCart();

}


// ========================================
// REMOVE FROM CART
// ========================================

function removeFromCart(id) {

    cart =
        cart.filter(item => item.id !== id);

    updateCart();

}


// ========================================
// OPEN CART
// ========================================

function openCart() {

    document
        .getElementById("cartSidebar")
        .classList.add("active");

    document
        .getElementById("cartOverlay")
        .classList.add("active");

}


// ========================================
// CLOSE CART
// ========================================

function closeCart() {

    document
        .getElementById("cartSidebar")
        .classList.remove("active");

    document
        .getElementById("cartOverlay")
        .classList.remove("active");

}


// ========================================
// WISHLIST
// ========================================

function toggleWishlist(id) {

    if (wishlist.includes(id)) {

        wishlist =
            wishlist.filter(item => item !== id);

    } else {

        wishlist.push(id);

    }


    document.getElementById("wishlistCount")
        .textContent = wishlist.length;


    displayProducts();

}


// ========================================
// CATEGORY FILTER
// ========================================

document.querySelectorAll(".category-btn")
    .forEach(button => {

        button.addEventListener("click", () => {

            document
                .querySelectorAll(".category-btn")
                .forEach(btn =>
                    btn.classList.remove("active")
                );


            button.classList.add("active");


            selectedCategory =
                button.dataset.category;


            displayProducts();

        });

    });


// ========================================
// SEARCH
// ========================================

document
    .getElementById("searchInput")
    .addEventListener(
        "input",
        displayProducts
    );


// ========================================
// CART EVENTS
// ========================================

document
    .getElementById("cartBtn")
    .addEventListener(
        "click",
        openCart
    );


document
    .getElementById("closeCart")
    .addEventListener(
        "click",
        closeCart
    );


document
    .getElementById("cartOverlay")
    .addEventListener(
        "click",
        closeCart
    );


// ========================================
// SEARCH BUTTON
// ========================================

document
    .getElementById("searchBtn")
    .addEventListener("click", () => {

        document
            .getElementById("shop")
            .scrollIntoView({
                behavior: "smooth"
            });

        document
            .getElementById("searchInput")
            .focus();

    });


// ========================================
// CHECKOUT
// ========================================

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }


    document
        .getElementById("checkoutModal")
        .classList.add("active");

}


function closeCheckout() {

    document
        .getElementById("checkoutModal")
        .classList.remove("active");

}


function placeOrder() {

    alert(
        "🎉 Order placed successfully! Thank you for shopping with StyleHub."
    );

    cart = [];

    updateCart();

    closeCheckout();

    closeCart();

}


// ========================================
// NEWSLETTER
// ========================================

function subscribe() {

    const email =
        document.getElementById("email").value;


    if (email === "") {

        alert("Please enter your email.");

        return;

    }


    alert(
        "Thank you for subscribing to StyleHub!"
    );


    document.getElementById("email").value = "";

}


// ========================================
// INITIAL LOAD
// ========================================

displayProducts();

updateCart();