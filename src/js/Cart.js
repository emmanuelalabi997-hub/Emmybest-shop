const Check = document.getElementById('Check');
const Box = document.getElementById('Box');
const slide = document.getElementById("slide");
const Check2 = document.getElementById('Check2');
const Box2 = document.getElementById('Box2');
const cartContainer = document.getElementById('cart-items-container');
const check3 = document.getElementById('Check3');
const Box3 = document.getElementById('Box3');
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
// --- 1. THE COMPLETE MATH CALCULATION FUNCTION ---
const updateOrderTotal = () => {
    let subtotal = 0;

    // Grab every item row inside the cart container
    document.querySelectorAll('#cart-items-container article').forEach(item => {
        let priceElement = item.querySelector('.ProductPrice');
        if (priceElement) {
            // Keep pulling the base unit price from data-price so the math stays accurate
            let price = parseFloat(priceElement.getAttribute('data-price')) || 0;
            let qty = parseInt(item.querySelector('.quantity-value').textContent) || 0;
            
            // Calculate total for just this specific product card
            let itemTotal = price * qty;
            subtotal = subtotal + itemTotal;

            // --- LIVE UPDATE: Change the card's display price text dynamically! ---
            priceElement.textContent = "₦" + itemTotal.toLocaleString();
        }
    });

    let deliveryFeeText = document.getElementById('delivery-fee').textContent.replace('N', '');
    let currentDeliveryFee = parseInt(deliveryFeeText) || 0;
    let grandTotal = subtotal + currentDeliveryFee;

    document.getElementById('SubTotal').textContent = "₦" + subtotal.toLocaleString();
    document.getElementById('Total').textContent = "₦" + grandTotal.toLocaleString();
};
// --- 2. THE DYNAMIC HTML GENERATOR LOOP ---
const displayCartItems = () => {
    let cart = JSON.parse(localStorage.getItem('emmyBestCart')) || [];
    
    let totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    if (document.getElementById('CartDisplay')) {
        document.getElementById('CartDisplay').textContent = totalItems;
    }
    const totalHeaderTracker = document.querySelector('main h1 span');
    if (totalHeaderTracker) {
        totalHeaderTracker.textContent = `(${totalItems})`;
    }

    // Clear out hardcoded HTML placeholders
    if (!cartContainer) return;
    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        cartContainer.innerHTML = `<div class="text-center py-10 text-gray-500 font-semibold w-full">Your cart is empty!</div>`;
        return;
    }

    // Build the dynamic elements cleanly
    cart.forEach(item => {
        const itemHTML = `
            <article class="w-full border border-gray-300 flex flex-row py-2 px-1 rounded-xl hover:border-[#000000cf] duration-300">
                <div>
                    <img src="${item.img}" alt="" class="w-44 h-24 object-cover rounded-2xl">
                </div>
                <div class="w-full flex flex-col justify-evenly pl-2">
                    <h1 class="font-semibold text-[18px]">${item.name}</h1>
                    <h3 class="ProductPrice text-[#E8181B] font-semibold text-xl" data-price="${item.price}">₦${item.price.toLocaleString()}</h3>
                    <section class="flex justify-center items-center w-24">
                        <button class="minus-btn w-7 border border-[#000000cf] h-8 rounded-bl-[5px] rounded-tl-[5px] flex justify-center items-center cursor-pointer"> 
                            <i class="fas fa-minus pointer-events-none"></i>
                        </button>
                        <div class="quantity-value w-10 border border-[#000000cf] h-8 flex justify-center items-center">${item.quantity}</div>
                        <button class="plus-btn w-7 border border-[#000000cf] h-8 rounded-br-[5px] rounded-tr-[5px] flex justify-center items-center cursor-pointer">
                            <i class="fas fa-plus pointer-events-none"></i>
                        </button>
                    </section>
                </div>
                <button class="Trash-Btn w-12 flex items-end text-xl text-gray-500 active:text-[#000000cf] cursor-pointer">
                    <i class="fas fa-trash pointer-events-none"></i>
                </button>
            </article>
        `;
        cartContainer.insertAdjacentHTML('beforeend', itemHTML);
    });
};

// Run rendering script immediately on load
displayCartItems();

// --- 3. DYNAMIC ACTIONS CLICK HANDLERS ---
if (cartContainer) {
    cartContainer.addEventListener('click', (e) => {
        let cart = JSON.parse(localStorage.getItem('emmyBestCart')) || [];
        let cardElement = e.target.closest('article');
        if (!cardElement) return;
        
        let productName = cardElement.querySelector('h1').textContent.trim();
        let targetProduct = cart.find(item => item.name === productName);

        // Plus
        if (e.target.classList.contains('plus-btn')) {
            if (targetProduct) {
                targetProduct.quantity += 1;
                localStorage.setItem('emmyBestCart', JSON.stringify(cart));
                displayCartItems(); // Re-render to refresh badges
                updateOrderTotal();
            }
        }
        
        // Minus
        if (e.target.classList.contains('minus-btn')) {
            if (targetProduct && targetProduct.quantity > 1) {
                targetProduct.quantity -= 1;
                localStorage.setItem('emmyBestCart', JSON.stringify(cart));
                displayCartItems();
                updateOrderTotal();
            }
        }
        
        // Trash
        if (e.target.classList.contains('Trash-Btn')) {
            cart = cart.filter(item => item.name !== productName);
            localStorage.setItem('emmyBestCart', JSON.stringify(cart));
            displayCartItems();
            updateOrderTotal();
        }
    });
}

// Checkbox event setups
Check.addEventListener('click', () => { 
    Check.classList.add('bg-[#E8181B]'); 
    Box.classList.remove('bg-[#E8181B]'); 
    check3.classList.remove('bg-[#E8181B]'); 
    Box3.classList.remove('bg-[#E8181B]'); 
    document.getElementById('delivery-fee').textContent = "N1000"; updateOrderTotal(); 
});
Box.addEventListener('click', () => { 
    Box.classList.add('bg-[#E8181B]'); 
    Check.classList.remove('bg-[#E8181B]'); 
    check3.classList.remove('bg-[#E8181B]'); 
    Box3.classList.remove('bg-[#E8181B]'); 
    document.getElementById('delivery-fee').textContent = "N0"; updateOrderTotal(); 
});
check3.addEventListener('click', () => { 
    check3.classList.add('bg-[#E8181B]'); 
    Box3.classList.remove('bg-[#E8181B]'); 
    Check.classList.remove('bg-[#E8181B]'); 
    Box.classList.remove('bg-[#E8181B]'); 
    document.getElementById('delivery-fee').textContent = "N3000"; updateOrderTotal(); 
});
Box3.addEventListener('click', () => { 
    Box3.classList.add('bg-[#E8181B]'); 
    check3.classList.remove('bg-[#E8181B]'); 
    Check.classList.remove('bg-[#E8181B]'); 
    Box.classList.remove('bg-[#E8181B]'); 
    document.getElementById('delivery-fee').textContent = "N0"; updateOrderTotal(); 
});
Check2.addEventListener('click', () => { 
    Check2.classList.add('bg-[#E8181B]'); 
    Box2.classList.remove('bg-[#E8181B]'); 
});
Box2.addEventListener('click', () => { 
    Box2.classList.add('bg-[#E8181B]'); 
    Check2.classList.remove('bg-[#E8181B]'); 
});


// --- 4. WHATSAPP ORDER SUBMISSION ---
const orderNowBtn = document.getElementById('order-now-btn');

if (orderNowBtn) {
    orderNowBtn.addEventListener('click', () => {


        // 1. Grab the latest items from localStorage
        let cart = JSON.parse(localStorage.getItem('emmyBestCart')) || [];
        
        if (cart.length === 0) {
            alert("Your cart is empty! Add some products before ordering.");
            return;
        }

        // 2. Grab the final numbers and text from the screen
        let subtotal = document.getElementById('SubTotal').textContent;
        let deliveryFee = document.getElementById('delivery-fee').textContent;
        let total = document.getElementById('Total').textContent;

        // 3. Find out which checkboxes are active for methods
        let deliveryMethod = "Not Selected";
        if (Check.classList.contains('bg-[#E8181B]')) deliveryMethod = "Home Delivery (Lagos)";
        if (Box.classList.contains('bg-[#E8181B]')) deliveryMethod = "Pickup from Store";
        if (check3.classList.contains('bg-[#E8181B]')) deliveryMethod = "Home Delivery (Outside Lagos)";
        if (Box3.classList.contains('bg-[#E8181B]')) deliveryMethod = "Pickup from Store";
        if (!Check.classList.contains('bg-[#E8181B]') && !Box.classList.contains('bg-[#E8181B]') && !Box3.classList.contains('bg-[#E8181B]') && !check3.classList.contains('bg-[#E8181B]')) {
            alert("Input a delivery method")
            return;
        }if (!Check2.classList.contains('bg-[#E8181B]') && !Box2.classList.contains('bg-[#E8181B]')) {
             alert("Input a payment method")
            return;
        } 
        

        let paymentMethod = "Not Selected";
        if (Check2.classList.contains('bg-[#E8181B]')) paymentMethod = "Pay before Delivery/Pickup"
        if (Box2.classList.contains('bg-[#E8181B]')) paymentMethod = "Pay on Delivery/Pickup";

        // 4. Build a beautiful, readable message string
        let message = `🛒 *NEW ORDER - EMMYBEST*\n`;
        message += `----------------------------------\n\n`;
        
        // Loop through each product item and add it to the message text list
        cart.forEach((item, index) => {
            let itemTotal = item.price * item.quantity;
            message += `*${index + 1}. ${item.name}*\n`;
            message += `   Qty: ${item.quantity} x ₦${item.price.toLocaleString()}\n`;
            message += `   Sub: ₦${itemTotal.toLocaleString()}\n\n`;
        });

        message += `----------------------------------\n`;
        message += `📦 *Delivery Method:* ${deliveryMethod}\n`;
        message += `💳 *Payment Method:* ${paymentMethod}\n`;
        message += `----------------------------------\n`;
        message += `💵 *Subtotal:* ${subtotal}\n`;
        message += `🚚 *Delivery Fee:* ${deliveryFee}\n`;
        message += `💰 *Grand Total:* ${total}\n\n`;
        message += `Please confirm my order details! 🙏`;

        // 5. Encode the message characters so the browser can read it safely inside a URL link
        let encodedMessage = encodeURIComponent(message);

        // Replace 234XXXXXXXXXX with your actual WhatsApp business phone number
        let whatsappNumber = "2348121756920"; 
        let whatsappURL = `https://wa.me/${8121756920}?text=${encodedMessage}`;

        // 6. Automatically redirect the browser page over to WhatsApp live!
        window.open(whatsappURL, '_blank');
    });
}
// Set default values instantly on opening
updateOrderTotal();