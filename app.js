const searchProducts = () => {
  fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(data => showDetails(data));
}

let cartItems = new Array(20).fill(0);
let count = 0;

const showDetails = (products) => {
  const container = document.getElementById('card-display');
  container.innerHTML = ''; // clear before adding
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = "product-card bg-white shadow-lg rounded-xl p-4 flex flex-col items-center hover:scale-[1.05] transition-transform duration-300";

    card.innerHTML = `
      <img src="${product.image}" class="w-32 h-32 object-contain mb-2" alt="product image"/>
      <h3 class="text-center text-sm font-semibold mb-1 line-clamp-2">${product.title}</h3>
      <p class="text-base font-bold text-green-700 mb-1">$${product.price}</p>
      <div class="mb-2">${ratings(product.rating.rate)}</div>
      <div class="flex gap-2">
        <button onclick="addToCart(${product.id}, ${product.price})" class="ripple px-3 py-1 bg-violet-500 text-white rounded hover:bg-violet-600 transition">Add</button>
        <button onclick="removeFromCart(${product.id}, ${product.price})" class="ripple px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition">Remove</button>
      </div>
    `;
    container.appendChild(card);
  });
}

const addToCart = (id, price) => {
  cartItems[id - 1]++;
  count++;
  document.getElementById('totall-item').innerText = count;

  const prevPrice = parseFloat(document.getElementById('price').innerText);
  const updatedPrice = prevPrice + price;
  document.getElementById('price').innerText = updatedPrice.toFixed(2);

  updateDeliveryAndTotal(updatedPrice);
}

const removeFromCart = (id, price) => {
  if (cartItems[id - 1] > 0) {
    cartItems[id - 1]--;
    count--;
    document.getElementById('totall-item').innerText = count;

    const prevPrice = parseFloat(document.getElementById('price').innerText);
    const updatedPrice = prevPrice - price;
    document.getElementById('price').innerText = updatedPrice.toFixed(2);

    updateDeliveryAndTotal(updatedPrice);
  }
}

const updateDeliveryAndTotal = (price) => {
  let delivery = 0;
  if (price >= 500 && price <= 800) delivery = 50;
  else if (price > 800) delivery = 120;

  document.getElementById('delivery').innerText = delivery;

  const totalPrice = price + delivery;
  document.getElementById('totall-price').innerText = totalPrice.toFixed(2);
}

const orderBtn = () => {
  const total = parseFloat(document.getElementById('totall-price').innerText);
  document.getElementById('orderCon').innerText = total.toFixed(2);
}

const ratings = (rate) => {
  const fullStars = Math.floor(rate);
  let stars = '<div class="text-yellow-500 flex items-center justify-center gap-1">';
  for (let i = 0; i < fullStars; i++) stars += '<i class="fas fa-star"></i>';
  stars += `<span class="text-black font-semibold">${rate.toFixed(1)}</span></div>`;
  return stars;
}

searchProducts();
