document.addEventListener("DOMContentLoaded", () => {
    const totalPriceElement = document.getElementById("totalPrice");
    let totalPrice = 0;

    const updateTotalPrice = () => {
        totalPriceElement.textContent = totalPrice.toFixed(2);
    };

    const calculateTotal = () => {
        totalPrice = 0;
        const cartItems = document.querySelectorAll(".cart-item");
        cartItems.forEach(item => {
            const price = parseFloat(item.getAttribute("data-price"));
            const quantity = parseInt(item.querySelector(".amount").textContent);
            totalPrice += price * quantity;
        });
        updateTotalPrice();
    };

    document.querySelectorAll(".increase").forEach(button => {
        button.addEventListener("click", () => {
            const item = button.closest(".item");
            const amountSpan = item.querySelector(".amount");
            let amount = parseInt(amountSpan.textContent);
            amount++;
            amountSpan.textContent = amount;
        });
    });

    document.querySelectorAll(".decrease").forEach(button => {
        button.addEventListener("click", () => {
            const item = button.closest(".item");
            const amountSpan = item.querySelector(".amount");
            let amount = parseInt(amountSpan.textContent);
            if (amount > 1) {
                amount--;
                amountSpan.textContent = amount;
            }
        });
    });

    document.querySelectorAll(".wishlist").forEach(button => {
        button.addEventListener("click", () => {
            button.classList.toggle("liked");
        });
    });

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", () => {
            const item = button.closest(".item");
            const price = parseFloat(item.getAttribute("data-price"));
            const amountSpan = item.querySelector(".amount");
            const quantity = parseInt(amountSpan.textContent); 
            const clonedItem = item.cloneNode(true);
            const cart = document.getElementById("cart");

        
            clonedItem.classList.add("cart-item");
            clonedItem.setAttribute("data-price", price); 
            clonedItem.querySelector(".add-to-cart").remove(); 
            clonedItem.querySelector(".decrease").remove(); 
            clonedItem.querySelector(".increase").remove(); 
            clonedItem.querySelector(".quantity").remove();

           
            const amountElement = document.createElement("span");
            amountElement.classList.add("amount");
            amountElement.textContent = quantity; 
            clonedItem.appendChild(amountElement);

         
            const removeButton = document.createElement("button");
            removeButton.textContent = "🗑️ Remove";
            removeButton.classList.add("remove-from-cart");
            clonedItem.appendChild(removeButton);

            cart.appendChild(clonedItem);
            calculateTotal();
        });
    });

    document.getElementById("cart").addEventListener("click", (event) => {
        if (event.target.classList.contains("remove-from-cart")) {
            event.target.closest(".cart-item").remove();
            calculateTotal();
        }
    });

    updateTotalPrice(); 
});
