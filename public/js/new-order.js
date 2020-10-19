// New order javascript
document.addEventListener('DOMContentLoaded', () => {
    localStorage.clear(); // any item in local storage is cleared

    // New order button of each item
    let orderPrice = document.querySelectorAll('.order-detail-price'); // Total price. Not sent to the backend*

    // For each item we add the click event to the button 
    document.querySelectorAll(".update-order-btn").forEach(btn => {
        let menuItem = btn.parentNode; // Whole item div is obtained ot get the info of each item
        const itemPrice = menuItem.querySelector('.menu-item-info .menu-item-price span').textContent;
        const itemId = menuItem.querySelector('input[name="itemId"]').value; // Id of hidden input



        btn.addEventListener("click", (e) => {
            e.preventDefault();

            let itemQty = menuItem.querySelector('input[name="menu-item-quantity"]').value; // Quantity is dynamic so it must be inside the click event


            // Creating a map (object works too) to store the products and the quantity in local storage
            let order = localStorage.getItem('order') ? new Map(JSON.parse(localStorage.getItem('order'))) : new Map();
            order.set(itemId, itemQty); // Modifying quantity of each item


            localStorage.setItem('order', JSON.stringify([...order])); // Storing MAP

            // We have 2 total prices elements depending on the size of the screen, we update both
            orderPrice.forEach(price => {
                let value = parseInt(price.textContent, 10);
                price.textContent = parseInt(value + itemQty * itemPrice, 10);
            })

        })
    });

});
