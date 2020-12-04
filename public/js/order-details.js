// New order javascript
document.addEventListener('DOMContentLoaded', () => {
    setSocketEvent();
});

const setSocketEvent = () => {

    const form = document.querySelector('#end-order-form');

    form.addEventListener('submit', (e) => {
        try {
            const socket = io.connect('http://localhost:3000');
            socket.emit('paymentApproval', { a: 'a' });
            socket.on('connection', () => {
                alert('connection')
            })
        } catch (error) {
            console.log(error);
        }

    })


}


