
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
const unavailable= document.getElementById("unavailable");
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


// --- Open Menu ---
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
        // Fallback check: when menu is closed, bring scrolling back
        MainBody.style.touchAction = "auto";
    }
});

// --- Close Menu (Cancels what threedot does) ---
ex.addEventListener("click", () => {
    // 1. Put the sidebar back to its hidden position
    slide.classList.toggle("-translate-x-56");
    
    // 2. Remove the blur effects
    body.classList.toggle("blur-3xl");
    footer.classList.toggle("blur-3xl");
    
    // 3. Re-enable standard scrolling for Android/Desktop
    MainBody.classList.remove("overflow-y-hidden");
    
    // 4. FIX FOR iOS SAFARI: Explicitly bring scrolling back when closing
    MainBody.style.touchAction = "auto";
});

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
filterButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        // Prevent default behavior if needed
        e.preventDefault();

        // 1. Manage Active Button Styling (Switch red background)
        filterButtons.forEach(btn => btn.classList.remove("bg-[#E8181B]", "text-white"));
        button.classList.add("bg-[#E8181B]", "text-white");

        const targetGender = button.getAttribute("data-target");
        let globalMatchFound = false;

        // 2. Filter the Product Cards based on gender
        productCards.forEach(card => {
            const cardGender = card.getAttribute("data-gender");

            if (targetGender === "all" || cardGender === targetGender) {
                card.classList.remove("hidden");
                globalMatchFound = true;
            } else {
                card.classList.add("hidden");
            }
        });

        // 3. FIX: Hide section headers if all products inside that section are hidden
        ProductName.forEach(header => {
            // Find the parent container section that holds this header and its grid rows
            const parentSection = header.closest("section");
            if (!parentSection) return;

            // Count how many product cards inside this specific section are still visible
            const visibleCardsInSection = parentSection.querySelectorAll(".ProductCard:not(.hidden)");

            if (visibleCardsInSection.length === 0 && targetGender !== "all") {
                // Hide the header if no matching products exist in this category
                header.classList.add("hidden");
            } else {
                // Show the header if at least one matching product is visible
                header.classList.remove("hidden");
            }
        });

        // 4. Handle the "Not Found" global state banner
        if (globalMatchFound) {
            unavailable.classList.add("hidden");
        } else {
            unavailable.classList.remove("hidden");
        }
    });
});


// --- FIX 1: Target placeholders as a class collection ---
const ProductHiddenCards = document.querySelectorAll(".layout-placeholder");

searchBtn.addEventListener("click", (event) => {
    event.preventDefault(); // Stop page reload
    
    let text = searchInput.value.toLowerCase().trim();
    let matchFound = false;

    productCards.forEach(card => {
        // --- FIX 2: If it's one of your width placeholders, skip it entirely ---
        if (card.classList.contains('layout-placeholder')) {
            return; 
        }

        let titleEl = card.querySelector("h1");
        if (!titleEl) return; 

        let title = titleEl.textContent.toLowerCase();
        const written = title.includes(text);

        // Hide or show real products based on search query
        if (written || text === "") {
            card.classList.remove("hidden");
            matchFound = true; // A real product matched!
        } else {
            card.classList.add("hidden");
        }
    });

    // --- FIX 3: Manage your Category Headers ---
    ProductName.forEach(CardName => {
        if (text !== "") {
            CardName.classList.add("hidden"); // Hide headers when filtering
        } else {
            CardName.classList.remove("hidden"); // Show them when search is empty
        }
    });

    // --- FIX 4: Handle "Not Found" state and placeholder cards together ---
    if (matchFound || text === "") {
        unavailable.classList.add("hidden"); 
        
        // Hide width placeholders if we are actively showing search results 
        // (so they don't pop up out of nowhere)
        ProductHiddenCards.forEach(hiddenCard => {
            hiddenCard.classList.add("hidden");
        });
    } else {
        unavailable.classList.remove("hidden"); 
        
        // Optional: Keep them hidden if nothing matches at all
        ProductHiddenCards.forEach(hiddenCard => {
            hiddenCard.classList.add("hidden");
        });
    }
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