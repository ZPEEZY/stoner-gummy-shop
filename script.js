// Product Data
const products = [
    {
        id: 1,
        title: "Pineapple Express Gummies",
        theme: "Pineapple Express Movie",
        description: "Tropical pineapple flavored gummies inspired by the legendary movie. Sweet, tangy, and unforgettable.",
        price: "$12.99",
        emoji: "🍍",
        character: "Dale & Saul inspired"
    },
    {
        id: 2,
        title: "Cheech & Chong Munchies Mix",
        theme: "Classic Comedy Duo",
        description: "A hilarious mix of gummy flavors inspired by the legendary comedy team. Best served with good vibes.",
        price: "$14.99",
        emoji: "😂",
        character: "Cheech & Chong"
    },
    {
        id: 3,
        title: "Half-Baked Strawberry Stash",
        theme: "Half Baked Classic",
        description: "Red strawberry gummies that'll keep you vibing. Dave Chappelle approved flavors.",
        price: "$11.99",
        emoji: "🍓",
        character: "Half-Baked Collection"
    },
    {
        id: 4,
        title: "Reefer Madness Rainbow Pack",
        theme: "Retro Stoner Comedy",
        description: "A kaleidoscope of fruity flavors that'll transport you to a groovy place. Multi-flavored goodness.",
        price: "$13.99",
        emoji: "🌈",
        character: "Vintage Stoner Vibes"
    },
    {
        id: 5,
        title: "Up in Smoke Spicy Gummies",
        theme: "Up in Smoke",
        description: "Spicy mango and chili flavored gummies with a kick. For those who like it hot and bold.",
        price: "$12.99",
        emoji: "🌶️",
        character: "Cheech & Chong Classic"
    },
    {
        id: 6,
        title: "Harold & Kumar White Castle Deluxe",
        theme: "Harold & Kumar",
        description: "Special blend of savory and sweet gummies. An epic flavor adventure in every bag.",
        price: "$14.99",
        emoji: "🏰",
        character: "Harold & Kumar"
    },
    {
        id: 7,
        title: "Good Burger Bites",
        theme: "90s Comedy Gold",
        description: "Nostalgic gummy snacks inspired by the cult classic. Ed approved! Extra dude flavor included.",
        price: "$11.99",
        emoji: "🍔",
        character: "Good Burger Vibes"
    },
    {
        id: 8,
        title: "Sour Patch Chill Mix",
        theme: "Chill Vibes Collection",
        description: "Sour then sweet gummies perfect for chilling out. A balanced experience for the soul.",
        price: "$12.99",
        emoji: "😎",
        character: "Smooth Operator Series"
    },
    {
        id: 9,
        title: "Purple Haze Berry Blast",
        theme: "Music & Vibes",
        description: "Mixed berry gummies with a purple twist. Inspired by classic stoner music culture.",
        price: "$13.99",
        emoji: "🫐",
        character: "Purple Haze Collection"
    }
];

let cart = [];
let currentProduct = null;

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    loadCart();
});

// Load products into the grid
function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.onclick = () => openModal(product);

        productCard.innerHTML = `
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <div class="product-title">${product.title}</div>
                <div class="product-theme">${product.theme}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-price">${product.price}</div>
                <button class="product-button" onclick="event.stopPropagation(); addToCartFromCard(${product.id})">Add to Cart</button>
            </div>
        `;

        productsGrid.appendChild(productCard);
    });
}

// Open product modal
function openModal(product) {
    currentProduct = product;
    document.getElementById('modalImage').textContent = product.emoji;
    document.getElementById('modalImage').style.fontSize = '150px';
    document.getElementById('modalTitle').textContent = product.title;
    document.getElementById('modalDescription').textContent = `${product.theme}\n\n${product.description}`;
    document.getElementById('modalPrice').textContent = product.price;
    document.getElementById('productModal').style.display = 'block';
}

// Close modal
function closeModal() {
    document.getElementById('productModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('productModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Add to cart from modal
function addToCart() {
    if (currentProduct) {
        addProductToCart(currentProduct);
        closeModal();
    }
}

// Add to cart from product card
function addToCartFromCard(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        addProductToCart(product);
    }
}

// Add product to cart
function addProductToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartCount();
    showNotification(`${product.title} added to cart!`);
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

// Update cart count
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = totalItems;
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #FF1493;
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        z-index: 2000;
        animation: slideIn 0.3s ease-out;
        font-weight: bold;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add slide-in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Contact form submission
document.querySelector('.contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    showNotification('Thanks for your message! We\'ll get back to you soon!');
    e.target.reset();
});
