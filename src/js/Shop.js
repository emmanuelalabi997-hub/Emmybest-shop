
const threedot = document.getElementById("threedot");
const slide = document.getElementById("slide");
const ex = document.getElementById("ex");
const body = document.getElementById("body");
const footer = document.getElementById("footer");
const Filter = document.getElementById("Filter");
const All = document.getElementById("All");
const Men = document.getElementById("Men");
const Women = document.getElementById("Women");
const Unisex = document.getElementById("Unisex");
const PullDown = document.querySelectorAll(".PullDown"); 
const DropDown = document.querySelectorAll(".DropDown");
const cartDisplay = document.getElementById("CartDisplay");
const productBtns = document.querySelectorAll('.product-btn');
const filterButtons = document.querySelectorAll(".FilterBtn");
const ProductButtons = document.querySelectorAll(".ProductBtn");
const productCards = document.querySelectorAll(".ProductCard");
const ProductName = document.querySelectorAll(".productname");
const searchInput = document.getElementById("site-search");
const searchBtn = document.getElementById("SearchBtn");
const filterSection = document.getElementById("FilterSection");
const unavailable= document.getElementById("unavailable")
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

Filter.addEventListener("click", () => {
    // Toggle the backgrounds (turn one off, turn the other on)
    Filter.classList.toggle("bg-gray-300");
    Filter.classList.toggle("bg-[#000000cf]");
     filterSection.classList.toggle("w-full");
    
    // Toggle the text/icon colors
    Filter.classList.toggle("text-gray-300");
});

All.addEventListener("click", () => {
    All.classList.add("bg-[#E8181B]");
    Men.classList.remove("bg-[#E8181B]");
    Women.classList.remove("bg-[#E8181B]");
    Unisex.classList.remove("bg-[#E8181B]");
})
Men.addEventListener("click", () => {
    Men.classList.add("bg-[#E8181B]");
    All.classList.remove("bg-[#E8181B]");
    Women.classList.remove("bg-[#E8181B]");
    Unisex.classList.remove("bg-[#E8181B]");
})
Women.addEventListener("click", () => {
    Women.classList.add("bg-[#E8181B]");
    All.classList.remove("bg-[#E8181B]");
    Men.classList.remove("bg-[#E8181B]");
    Unisex.classList.remove("bg-[#E8181B]");
})
Unisex.addEventListener("click", () => {
    Unisex.classList.add("bg-[#E8181B]");
    All.classList.remove("bg-[#E8181B]");
    Men.classList.remove("bg-[#E8181B]");
    Women.classList.remove("bg-[#E8181B]");
})


//cAtegory Dropdown
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
if (filterButtons.length > 0 && productCards.length > 0) {
    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            // Get the gender category from the clicked button (e.g., "male")
            const targetGender = button.getAttribute("data-target");

            // Loop through all product cards
            productCards.forEach((card) => {
                const cardGender = card.getAttribute("data-gender");

                // If "All" is clicked, or if the card matches the clicked gender
                if (targetGender === "all" || cardGender === targetGender) {
                    card.classList.remove("hidden"); // Show it
                } else {
                    card.classList.add("hidden");    // Hide it
                }
            });
        });
    });
}


searchBtn.addEventListener("click", () => {
    let text = searchInput.value.toLowerCase().trim();
    
    productCards.forEach(card => {
        let title = card.querySelector("h1").textContent.toLowerCase();
        const written = title.includes(text)

        ProductName.forEach(CardName => {
             if (written || text === "") {
            CardName.classList.toggle("hidden", false); 
            
           
        } else {
            CardName.classList.toggle("hidden", true); 

        }
        } )
        
        // If it matches, or if search is empty, show it!
        if (written || text === "") {
            card.classList.toggle("hidden", false); 
            unavailable.classList.toggle("hidden",true);
           
        } else {
            card.classList.toggle("hidden", true); 
            unavailable.classList.toggle("hidden",false);
        }
    })
    
    });
    
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


// This runs automatically as soon as the Shop page loads
window.addEventListener('DOMContentLoaded', () => {
    // 1. Check the URL for "?category=men", "?category=women", or "?category=unisex"
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category'); 

    if (categoryParam) {
        // 2. Turn the string lowercase parameter (e.g. 'men') into capitalized format ('Men')
        const formattedID = categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1).toLowerCase();
        
        // 3. Find the button using your exact element IDs ("Men", "Women", "Unisex")
        const targetButton = document.getElementById(formattedID); 
        
        // 4. Click it automatically!
        if (targetButton) {
            targetButton.click();
        }
    }
});

// Run it once right when the shop page loads so it shows old saved items
updateShopBadge();