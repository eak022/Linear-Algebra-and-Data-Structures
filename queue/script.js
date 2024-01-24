let queue = [];

document.getElementById('enqueueBtn').addEventListener('click', () => {
    const customerName = document.getElementById('customerName').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const additionalInfo = document.getElementById('additionalInfo').value;

    if (customerName && phoneNumber && additionalInfo && queue.length < 10 && phoneNumber.length === 10 && !isNaN(phoneNumber)) {
        const customer = { name: customerName, phone: phoneNumber, info: additionalInfo };
        queue.push(customer);
        document.getElementById('customerName').value = '';
        document.getElementById('phoneNumber').value = '';
        document.getElementById('additionalInfo').value = '';
        updateQueueDisplay();
    } else if (queue.length >= 10) {
        alert('Queue is full. Cannot join the queue.');
    } else if (phoneNumber.length !== 10 || isNaN(phoneNumber)) {
        alert('กรุณาใส่เบอร์ติดต่อให้ถูกต้อง');
    } else {
        alert('Please fill in all fields.');
    }
});

document.getElementById('dequeueBtn').addEventListener('click', () => {
    if (queue.length > 0) {
        const nextCustomer = queue.shift();
        alert(`Next customer: ${nextCustomer.name} (${nextCustomer.phone}) - ${nextCustomer.info}`);
        updateQueueDisplay();
    } else {
        alert('No more customers in the queue.');
    }
});

function updateQueueDisplay() {
    const queueList = document.getElementById('queueList');
    queueList.innerHTML = `<h3>Queue (${queue.length} / 10)</h3>`;
    queue.forEach((customer, index) => {
        queueList.innerHTML += `<p>${index + 1}. ${customer.name} - ${customer.phone} - ${customer.info}</p>`;
    });
}
