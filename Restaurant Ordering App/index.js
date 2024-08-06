import { menuArray } from "/data.js";


const foodSectionEl = window.document.getElementById("food-sc");
const orderSectionEl = window.document.getElementById("order-sc");
const totalOrderPrice = window.document.getElementById("total-order-price");
const completeOrderBtn = window.document.getElementById("complete-order")

const infosForm = window.document.getElementById("infos-form")

let totalOrder = [];
let totalPrice = 0;

// Aggiungere un elemento all'ordine
foodSectionEl.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-item')) {
        orderSectionEl.classList.remove("hidden")
        totalOrderPrice.classList.remove("hidden")
        const itemElement = e.target.parentElement;
        const itemName = itemElement.querySelector('.item-infos h2').textContent;
        const itemPriceText = itemElement.querySelector('.item-infos h3').textContent;
        const itemPrice = parseFloat(itemPriceText.replace('$', ''));

        const itemToAdd = {
            name: itemName,
            price: itemPrice
        };

        renderOrder(itemToAdd);
    }
});

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        deleteItem(e.target.dataset.name);
    } else if(e.target.id === "complete-order" && totalOrder.length !== 0) {
        completeOrder()
    } else if(e.target.id === "pay-btn") {
        displayFinalMsg()
    }
})


function renderFood() {
    const elementsRender = menuArray.map((item) => {
        return `
            <div class="food-item">
                <div class="subcontainer-item">
                    <img src="${item.image}" />
                    <div class="item-infos">
                        <h2>${item.name}</h2>
                        <p>${item.ingredients}</p>
                        <h3>$${item.price.toFixed(2)}</h3>
                    </div>
                </div>
                <div class="add-item">+</div>
            </div>
        `;
    }).join("");

    foodSectionEl.innerHTML = elementsRender;
}


function renderOrder(item) {
    if (item.name) {
        totalOrder.push(item);
        totalPrice += item.price;
    }

    const orderItemsHTML = totalOrder.map((item, index) => {
        return `
            <div class="order-item">
                <div style="display: flex;">
                    <div style="margin-right: 30px;">${item.name}</div>
                    <button class="delete-btn" data-name="${item.name}">DELETE</button>
                </div>
                <div>$${item.price.toFixed(2)}</div>
            </div>
        `;
    }).join("");

    orderSectionEl.innerHTML = orderItemsHTML;

    const total = `
        <h3>Total Price: $${totalPrice.toFixed(2)}</h3>
    `;
    totalOrderPrice.innerHTML = total;
}

// Funzione per eliminare un elemento dall'ordine
function deleteItem(itemName) {
    const itemIndex = totalOrder.findIndex(item => item.name === itemName);
    
    if (itemIndex !== -1) {
        totalPrice -= totalOrder[itemIndex].price;
        totalOrder.splice(itemIndex, 1);
        renderOrder({})
    }
}



function completeOrder() {
    let inputs = `
    <input type="text" placeholder="Enter your name" name="personName" required>
    <input type="text" placeholder="Enter card number" name="cardNumber" pattern="[0-9]{16}" required>
    <input type="password" placeholder="Enter CVV" name="CVV" required>
    <button id="pay-btn">PAY</button>
    `


    orderSectionEl.classList.add("disabled")
    foodSectionEl.classList.add("disabled")

    infosForm.innerHTML = inputs;
    
    // Mostra il form al centro
    infosForm.classList.remove("hidden");
    
    // Disabilita l'interazione con il resto della pagina
    foodSectionEl.classList.add("disabled");
    orderSectionEl.classList.add("disabled");
}



function displayFinalMsg() {    
    infosForm.innerHTML = ""
    infosForm.classList.add("hidden")
    orderSectionEl.innerHTML = ""
    completeOrderBtn.classList.add("hidden")

    let finalMsg = `
    <h2>Thanks! Your order is on its way!</h2>
    `
    totalOrderPrice.innerHTML = finalMsg;
    rateExp()
}

function rateExp() {
    document.getElementById("rate-exp").innerHTML = `
        <div>
            <div style="margin: 20px;">
                Help us growing by rating your experience from 1 to 5 stars!
            </div>
            <div id="star-container">
                <button class="star">⭐</button>
                <button class="star">⭐</button>
                <button class="star">⭐</button>
                <button class="star">⭐</button>
                <button class="star">⭐</button>
            </div>
        </div>
    `

    const stars = window.document.querySelectorAll(".star")

    stars.forEach((star, index) => {
        star.addEventListener("click", () => {
            stars.forEach((s, i) => {
                s.classList.toggle('active', i <= index);
            })
        })
    })
}

renderFood();
