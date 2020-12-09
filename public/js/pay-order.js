// New order javascript
document.addEventListener('DOMContentLoaded', () => {
    try {
        setSocket();
        setTotal();
        addTipEvent();
    } catch (error) {
        console.log(error);
    }


});

const setTotal = () => {
    // we set the total price and the tip
    let orderTotal = document.querySelector('.order-total-price');
    let orderTotalNoTip = document.querySelector('.order-total-price-no-tip');
    let tip = document.querySelector('input[name="tip"]');
    let orderTotalValue = 0;

    document.querySelectorAll(".item-detail-row").forEach(item => { // forEach item we get the details
        const itemQty = item.querySelector('.item-quantity').textContent;
        const itemPrice = item.querySelector('.item-price span').textContent;

        // adding the qty * price of each item to the total order value
        orderTotalValue = parseInt(orderTotalValue + itemQty * itemPrice, 10);
    });


    let tipValue = Math.round(parseInt(orderTotalValue * 0.1, 10)); // we set the 10% default tip 
    tip.value = tipValue; // assigning the value to the input

    // setting the total price in the <h> tags
    orderTotalNoTip.textContent = orderTotalValue;
    orderTotal.textContent = orderTotalValue + tipValue;
}

// adding the change listener event to the tip input, if I modify the tip the total price should be modified too
const addTipEvent = () => {
    const inputTip = document.querySelector('input[name="tip"]');
    let orderTotalNoTip = document.querySelector('.order-total-price-no-tip');
    let orderTotal = document.querySelector('.order-total-price');
    let tip;

    inputTip.addEventListener("change", (e) => {
        e.preventDefault();

        tip = parseInt(inputTip.value); // we get the input val
        totalNoTip = parseInt(orderTotalNoTip.textContent, 10); // total price without tip so we can add the tip
        orderTotal.textContent = parseInt(totalNoTip + tip, 10); // total price with tip 
    })
}

const setSocket = () => {
    //const socket = io('http://localhost:3000'); LOCALHOST

    const socket = io('http://52.67.94.106:3000');
    socket.connect();

    // Show payment confirmation page after receiving socket message
    socket.on('paymentApproval', (data) => {
        window.location.replace('./../payment-confirmed');
    })
}


