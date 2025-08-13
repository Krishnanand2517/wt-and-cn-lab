function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(book) {
  const cart = getCart();
  const index = cart.findIndex((item) => item.title === book.title);
  if (index !== -1) {
    cart[index].qty += 1;
  } else {
    cart.push({ ...book, qty: 1 });
  }
  saveCart(cart);
  alert(`"${book.title}" added to cart!`);
}

function removeFromCart(title) {
  let cart = getCart();
  cart = cart.filter((item) => item.title !== title);
  saveCart(cart);
  renderCart();
}

function renderCart() {
  const cart = getCart();
  const tableBody = document.getElementById("cart-body");
  const totalElem = document.getElementById("total");
  const paymentBtnContainer = document.getElementById("payment-btn-container");

  tableBody.innerHTML = "";

  if (cart.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="5">Your cart is empty.</td></tr>`;
    totalElem.textContent = "";
    return;
  }

  let total = 0;
  cart.forEach((item) => {
    total += item.price * item.qty;
    tableBody.innerHTML += `
            <tr>
                <td><img src="${item.image}" height="80"></td>
                <td>${item.title}</td>
                <td>${item.price}</td>
                <td>${item.qty}</td>
                <td><button onclick="removeFromCart('${item.title}')">Remove</button></td>
            </tr>
        `;
  });

  totalElem.textContent = "Total: Rs " + total.toFixed(2);

  paymentBtnContainer.style.display = cart.length > 0 ? "block" : "none";
}
