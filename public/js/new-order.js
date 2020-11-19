// New order javascript
document.addEventListener('DOMContentLoaded', () => {
    localStorage.clear(); // any item in local storage is cleared
    addItemEvent();
    fillCurrentOrderData();
});

// Appending order of browser local storage to form when clicking submit
const appendOrder = () => {
    const addOrderForm = document.querySelectorAll('[name="add-order-form"]'); // Add order button form
    const order = localStorage.getItem('order') || ''; // Getting order map with the items and quantity

    // IN order to add the order map to the form we create hidden inputs and append the data. THere are 2 buttons 
    addOrderForm.forEach(form => {
        let hiddenField = document.createElement('input');
        hiddenField.setAttribute('type', 'hidden');
        hiddenField.setAttribute('name', 'order');
        hiddenField.setAttribute('value', order);

        form.appendChild(hiddenField);
        form.submit(); // submitting form after appending order
    })

    //return true; //We had return appendOrder() before
}



const fillCurrentOrderData = () => {
    // Here if we are ordering extra we create the localStorage Order and set the price
    const urlParams = new URLSearchParams(window.location.search);
    const isExtra = urlParams.get('extra');

    if (isExtra) {
        let orderPrice = document.querySelectorAll('.order-detail-price');
        let order = new Map();

        document.querySelectorAll(".menu-item").forEach(item => { // forEach item we get the details
            const currentItemQty = item.querySelector('input[name="currentItemQty"]').value;
            const itemPrice = item.querySelector('.menu-item-info .menu-item-price span').textContent;
            const itemId = item.querySelector('input[name="itemId"]').value; // Id of hidden input

            orderPrice.forEach(price => {
                let value = parseInt(price.textContent, 10);
                price.textContent = parseInt(value + currentItemQty * itemPrice, 10);
            })
        })
    }

}




const addItemEvent = () => {
    let orderPrice = document.querySelectorAll('.order-detail-price'); // Total price. Not sent to the backend*

    // For each item we add the click event to the button 
    document.querySelectorAll(".update-order-btn").forEach(btn => {
        let menuItem = btn.parentNode; // Whole item div is obtained ot get the info of each item
        const itemPrice = menuItem.querySelector('.menu-item-info .menu-item-price span').textContent;
        const itemId = menuItem.querySelector('input[name="itemId"]').value; // Id of hidden input


        btn.addEventListener("click", (e) => {
            e.preventDefault();

            let itemQty = menuItem.querySelector('input[name="menu-item-quantity"]').value; // Quantity is dynamic so it must be inside the click event

            // Creating a map (object works too or cookie) to store the products and the quantity in local storage
            let order = localStorage.getItem('order') ? new Map(JSON.parse(localStorage.getItem('order'))) : new Map();
            finalItemQty = order.has(itemId) ? itemQty - order.get(itemId) : itemQty; // Getting the item quantity used to modify the total, if the item is already in the map the quantity is updated (positive or negative) otherwise the one entered is used

            order.set(itemId, itemQty); // Modifying quantity of each item
            localStorage.setItem('order', JSON.stringify([...order])); // Storing MAP



            // We have 2 total prices elements depending on the size of the screen, we update both
            orderPrice.forEach(price => {
                let value = parseInt(price.textContent, 10);
                price.textContent = parseInt(value + finalItemQty * itemPrice, 10);
            })
        })
    });
}