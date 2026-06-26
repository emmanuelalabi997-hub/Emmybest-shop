// Check if the user has already seen the welcome message during this session
if (!sessionStorage.getItem("welcomeAlertShown")) {
    
    // Display the alert message
    alert("Welcome to EmmyBest Shop!, we sell anything fragrance and we are pleased to have you here and we hope we have what you are looking for. \n\nDisclaimer: This website is only mobile friendly.");
    
    // Save the flag so it won't trigger again on page navigation
    sessionStorage.setItem("welcomeAlertShown", "true");
}
const threedot = document.getElementById("threedot");
const slide = document.getElementById("slide");
const ex = document.getElementById("ex");
const body = document.getElementById("body");
const footer = document.getElementById("footer");
const PullDown = document.querySelectorAll(".PullDown"); 
const DropDown = document.querySelectorAll(".DropDown");
const cartDisplay = document.getElementById("CartDisplay");
const productBtns = document.querySelectorAll('.product-btn');
const productCards = document.querySelectorAll(".ProductCard");
const MenType = document.getElementById("MenType");
const MainBody = document.getElementById("MainBody");
const policy = document.getElementById("policy");
const Term = document.getElementById("terms")

policy.addEventListener('click', () => {
    alert("This is unavailable at the moment");
    return;
});
Term.addEventListener('click', () => {
    alert("This is unavailable at the moment");
    return;
});

threedot.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    slide.classList.toggle("-translate-x-56");
    body.classList.toggle("blur-3xl");
    footer.classList.toggle("blur-3xl");
    
    // Toggle overflow hidden for Android/Desktop
    MainBody.classList.toggle("overflow-y-hidden");

    // FIX FOR iOS SAFARI:
    if (MainBody.classList.contains("overflow-y-hidden")) {
        // When menu is open, lock touch scrolling on iOS
        MainBody.style.touchAction = "none";
    } else {
        // When menu is closed, bring scrolling back
        MainBody.style.touchAction = "auto";
    }
});

ex.addEventListener("click", () => {
    slide.classList.toggle("-translate-x-56");
    body.classList.toggle("blur-3xl");
    footer.classList.toggle("blur-3xl");
    MainBody.classList.remove("overflow-y-hidden");
});
//category Dropdown
PullDown.forEach((div) => {
    div.addEventListener("click", () => {
        div.classList.toggle("bg-gray-300");
        div.classList.toggle("bg-[#000000cf]");
        const dropdown = div.nextElementSibling;
        dropdown.classList.toggle("h-36");
        

    });
});

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