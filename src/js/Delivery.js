
const threedot = document.getElementById("threedot");
const slide = document.getElementById("slide");
const ex = document.getElementById("ex");
const body = document.getElementById("body");
const footer = document.getElementById("footer");

threedot.addEventListener("click", () => {
    slide.classList.toggle("-translate-x-56");
    body.classList.toggle("blur-3xl");
    footer.classList.toggle("blur-3xl");
})

ex.addEventListener("click", () => {
    slide.classList.toggle("-translate-x-56");
    body.classList.toggle("blur-3xl");
    footer.classList.toggle("blur-3xl");
})

//Delivery js
const dropdown = document.getElementById("dropdown");
const row = document.getElementById("row");
const dropdown2 = document.getElementById("dropdown2");
const row2 = document.getElementById("row2");
const dropdown3 = document.getElementById("dropdown3");
const row3 = document.getElementById("row3");
const productBtns = document.querySelectorAll('.product-btn');
const cartDisplay = document.getElementById("CartDisplay");

dropdown.addEventListener("click", () => {
    dropdown.classList.toggle("fa-chevron-right");
    row.classList.toggle("h-26");
})
dropdown2.addEventListener("click", () => {
    dropdown2.classList.toggle("fa-chevron-right");
    row2.classList.toggle("h-56");
})
dropdown3.addEventListener("click", () => {     
    dropdown3.classList.toggle("fa-chevron-right");
    row3.classList.toggle("h-44");
})


// 2. Initialize the cart count from localStorage, or start at 0 if empty
let savedCount = parseInt(localStorage.getItem('savedCartCount')) || 0;

// Update the display immediately when the page loads so it doesn't stay at 0
if (cartDisplay) {
    cartDisplay.textContent = savedCount;
}

// 3. Add event listeners to your product buttons
if (productBtns.length > 0) {
    productBtns.forEach((btn) => {
        btn.addEventListener('click', (event) => {
            // Stop potential form submissions or page resets
            event.preventDefault();

            // Increment your counter variable
            savedCount++;

            // Update the HTML display screen immediately
            if (cartDisplay) {
                cartDisplay.textContent = savedCount;
            }

            // Save the value to localStorage so it persists when refreshed
            localStorage.setItem('savedCartCount', savedCount);
            
            console.log("Item added! Current cart total:", savedCount);
        });
    });
}

    
// ... Keep your menu slider and search filters at the top exactly as they are ...

// Update the badge with the correct item quantity count on load
function updateShopBadge() {
    let cart = JSON.parse(localStorage.getItem('emmyBestCart')) || [];
    let totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const badge = document.getElementById('CartDisplay');
    if (badge) {
        badge.textContent = totalItems;
    }
}
updateShopBadge(); // Run once immediately

// FIXING THE CLICK LOOP: Connect your buttons to the master storage array
if (productBtns.length > 0) {
    productBtns.forEach((btn) => {
        btn.addEventListener('click', (event) => {
            event.preventDefault();

            // 1. Climb up to find the closest Product Card wrapper layout
            const card = btn.closest('.ProductCard');
            if (!card) return;

            // 2. Extract product details directly from the HTML structure
            const name = card.querySelector('h1').textContent.trim();
            // Get raw number from data-price or fallback to stripping symbols from text
            const priceText = card.querySelector('.ProductPrice')?.getAttribute('data-price') || "0";
            const price = parseFloat(priceText);
            const imgSrc = card.querySelector('img').getAttribute('src');

            // 3. Fire the master data storage function
            addToCart(name, price, imgSrc);
        });
    });
}

// Master storage logic handler
function addToCart(name, price, imgSrc) {
    let cart = JSON.parse(localStorage.getItem('emmyBestCart')) || [];
    let existingProduct = cart.find(item => item.name === name);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ name: name, price: price, img: imgSrc, quantity: 1 });
    }

    localStorage.setItem('emmyBestCart', JSON.stringify(cart));
    updateShopBadge();
}
// Run it once right when the shop page loads so it shows old saved items
updateShopBadge();