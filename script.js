
const products = [
    {
      id: 1,
      name: "Laptop HP",
      description: "Windows 11 Home in S modeIntel || N-series N100 4GB || RAM128 GB UFS15.6 || FHDIntel® || UHD Graphics",
      price: 899,
      image: "https://www.hp.com/ca-en/shop/Html/Merch/Images/c08515025_390x286.jpg"
    },
    {
      id: 2,
      name: "Mobile Phone",
      description: "Samsung Galaxy A03s || Latest model with powerful features.",
      price: 499,
      image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQTqwTCXy3r_VbqsrO5b4qo_kafqRbN5BKWlN-LiKx0TFEHXLOXxtH3c4QJdATuKeIryRt-I3IWLEAb_HtiootVnBGRqPRufnIY-q9j3OozB8tDXCVC0k24"
    },
    {
      id: 4,
      name: "Mouse",
      description: "ZELOTES GAMING MOUSE || Colorful Mouses",
      price: 100,
      image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcT9jGuiMGUpJHAOytKffmdfln0V_pAWSgiHTYRPTRX5hi0ghdjnZUpdLESgibmZ3AyugkwPVxWGBttw7bUURKuja8Jtda8ax9K7ogiGVga108MmLZUUg3zt"
    },

    {
        id: 3,
        name: "Keyboard",
        description: "Mechanical Keyboards || SteelSeries Apex 3 Water Resistant Gaming Keyboard.",
        price: 220,
        image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQl1TYY_nmO3doTraLJl6plS3aUSiHll9U41ymYv88wPoiW43XijtHF86JoMm3DI1IbgquNaqxbsS9b3ICAh-uNMFGd8UoSWK75dq_Fju0AgMq-vMDKg87_KA"
      }
  ];
  
  
  let cart = [];
  

  const productsContainer = document.getElementById('products-container');
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const checkoutBtn = document.getElementById('checkout-btn');
  const clearCartBtn = document.getElementById('clear-cart');
  
 
  function displayProducts() {
    productsContainer.innerHTML = '';
    products.forEach(product => {
      const productElement = document.createElement('div');
      productElement.classList.add('product-item');
      productElement.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p>$${product.price}</p>
        <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
      `;
      productsContainer.appendChild(productElement);
    });
  }
  

  function addToCart(productId) {
    const product = products.find(item => item.id === productId);
    const cartItem = cart.find(item => item.id === productId);
  
    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
  
    updateCart();
  }
  
  

  function updateCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      cartItem.innerHTML = `
        <p>${item.name} ($${item.price})</p>
        <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)">
        <button onclick="removeFromCart(${item.id})">Remove</button>
      `;
      cartItemsContainer.appendChild(cartItem);
      total += item.price * item.quantity;
    });
  
    cartTotal.textContent = total.toFixed(2);
  }
  

  function updateQuantity(productId, newQuantity) {
    const cartItem = cart.find(item => item.id === productId);
    if (newQuantity < 1) {
      alert("Quantity must be at least 1");
      return;
    }
    cartItem.quantity = parseInt(newQuantity, 10);
    updateCart();
  }
  

  function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
  }
  

  clearCartBtn.addEventListener('click', () => {
    cart = [];
    updateCart();
  });
  

  checkoutBtn.addEventListener('click', () => {
    if (cart.length > 0) {
      alert("Proceeding to checkout");
    } else {
      alert("Your cart is empty.");
    }
  });
  

  displayProducts();
  

