// Динамічний Header (Дата та час) 
function updateDateTime() {
    const datetimeContainer = document.getElementById('datetime-container');
    const now = new Date();

    const dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = now.toLocaleDateString('uk-UA', dateOptions);

    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const formattedTime = now.toLocaleTimeString('uk-UA', timeOptions);
    
    datetimeContainer.textContent = `${formattedDate} | ${formattedTime}`;
}

updateDateTime();
setInterval(updateDateTime, 1000);


// Система навігації (SPA-поведінка)
function initNavigation() {
    const navElements = document.querySelectorAll('.nav-btn, #profile-icon-btn');
    const sections = document.querySelectorAll('.page-section');

    navElements.forEach(element => {
        element.addEventListener('click', (event) => {
            const targetId = element.getAttribute('data-target');

            document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
            
            if (element.classList.contains('nav-btn')) {
                element.classList.add('active');
            }

            sections.forEach(section => {
                section.classList.remove('active'); 
                if (section.id === targetId) {
                    section.id === targetId ? section.classList.add('active') : null;
                }
            });
            
            const profileIcon = document.getElementById('profile-icon-btn');
            profileIcon.style.color = (targetId === 'profile-section') ? 'var(--secondary-color)' : '';
        });
    });
}

initNavigation();


// Інформація про систему (BOM Navigator) 
function displaySystemInfo() {
    const aboutContainer = document.getElementById('system-info');
    const footerContainer = document.getElementById('footer-navigator-info');

    const detailedInfoHTML = `
        <h3>Дані вашого середовища:</h3>
        <ul style="list-style-type: none; margin-top: 10px; line-height: 1.6;">
            <li><strong>Браузер (User Agent):</strong> ${navigator.userAgent}</li>
            <li><strong>Мова браузера:</strong> ${navigator.language}</li>
            <li><strong>Платформа/ОС:</strong> ${navigator.platform}</li>
            <li><strong>Cookies увімкнено:</strong> ${navigator.cookieEnabled ? 'Так' : 'Ні'}</li>
            <li><strong>Онлайн статус:</strong> ${navigator.onLine ? 'Підключено до мережі' : 'Офлайн'}</li>
        </ul>
    `;

    if (aboutContainer) {
        aboutContainer.innerHTML = detailedInfoHTML;
    }
    if (footerContainer) {
        footerContainer.textContent = `ОС: ${navigator.platform} | Мова: ${navigator.language}`;
    }
}

displaySystemInfo();

// Робота з даними
let products = []; 

async function fetchProducts() {
    try {
        const response = await fetch('products.json');
        if (!response.ok) throw new Error('Помилка мережі');
        products = await response.json();
        renderCards(products); // Відмальовуємо картки ТІЛЬКИ після успішного завантаження
    } catch (error) {
        console.error('Помилка завантаження товарів:', error);
        productsContainer.innerHTML = '<p>Не вдалося завантажити товари. Перевірте файл products.json.</p>';
    }
}

fetchProducts();

const productsContainer = document.getElementById('products-container');
const searchInput = document.getElementById('search-input');

function renderCards(items) {
    productsContainer.innerHTML = '';
    
    items.forEach(item => {
        const cardHTML = `
            <div class="product-card" data-card-id="${item.id}" style="cursor: pointer;">
                <img src="${item.image}" alt="${item.title}">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <p class="price">${item.price} ₴</p>
                <button class="order-btn" data-id="${item.id}">Додати в кошик</button>
            </div>
        `;
        productsContainer.insertAdjacentHTML('beforeend', cardHTML);
    });
}

searchInput.addEventListener('input', (event) => {
    const query = event.target.value.toLowerCase().trim();
    
    const filteredProducts = products.filter(product => 
        product.title.toLowerCase().includes(query)
    );
    
    renderCards(filteredProducts);
});


// Обробка форм та валідація
const checkoutForm = document.getElementById('checkout-form');
const formMessage = document.getElementById('form-message');
const phoneError = document.getElementById('phone-error');
const phoneInput = document.getElementById('client-phone');

if (checkoutForm) {
    checkoutForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('client-name').value.trim();
        const phone = phoneInput.value.trim();
        const email = document.getElementById('client-email').value.trim();

        formMessage.textContent = '';
        formMessage.className = 'form-message';
        phoneError.style.display = 'none';
        phoneInput.style.borderColor = '#cbd5e1';

        let isValid = true;

        if (!name || !phone || !email) {
            formMessage.textContent = 'Помилка: Будь ласка, заповніть всі обов\'язкові поля.';
            formMessage.classList.add('error');
            isValid = false;
        }

        const phoneRegex = /^\+380\d{9}$/;
        
        if (phone && !phoneRegex.test(phone)) {
            phoneError.textContent = 'Невірний формат. Використовуйте +380XXXXXXXXX';
            phoneError.style.display = 'block';
            phoneInput.style.borderColor = '#ef4444'; 
            isValid = false;
        }

        if (isValid) {
            if (!currentUser) {
                formMessage.textContent = 'Помилка: Увійдіть у Профіль для оформлення замовлення.';
                formMessage.classList.add('error');
                return;
            }

            const newOrder = {
                id: 'ORD-' + Math.floor(Math.random() * 10000),
                date: new Date().toLocaleDateString('uk-UA'),
                userEmail: currentUser.email,
                items: [...cart],
                total: cart.reduce((sum, item) => sum + item.price, 0)
            };

            const allOrders = JSON.parse(localStorage.getItem('techSupplyOrders')) || [];
            allOrders.push(newOrder);
            localStorage.setItem('techSupplyOrders', JSON.stringify(allOrders));

            formMessage.textContent = `Дякуємо, ${name}! Замовлення ${newOrder.id} прийнято.`;
            formMessage.classList.add('success');
            
            checkoutForm.reset();
            cart = []; 
            saveCartToStorage(); 
            renderCart(); 
            renderProfileUI(); 
        }
    });
}


// Делегування подій (Кошик)  + localStorage для збереження стану кошика
const savedCart = localStorage.getItem('techSupplyCart');
let cart = savedCart ? JSON.parse(savedCart) : [];
const cartContent = document.getElementById('cart-content');

function saveCartToStorage() {
    localStorage.setItem('techSupplyCart', JSON.stringify(cart));
}

function renderCart() {
    if (cart.length === 0) {
        cartContent.innerHTML = '<p>Тут з\'являться обрані товари. Кошик наразі порожній.</p>';
        return;
    }

    cartContent.innerHTML = ''; 
    
    cart.forEach((item, index) => {
        const cartItemHTML = `
            <div class="cart-item">
                <span class="cart-item-title">${item.title}</span>
                <span class="cart-item-price">${item.price} ₴</span>
                <!-- Зберігаємо індекс елемента в data-index для видалення -->
                <button class="remove-btn" data-index="${index}">Видалити</button>
            </div>
        `;
        cartContent.insertAdjacentHTML('beforeend', cartItemHTML);
    });
}

// Модальні вікна 
const modal = document.getElementById('product-modal');
const closeModalBtn = document.querySelector('.close-modal');
const modalDetails = document.getElementById('modal-details');

productsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('order-btn')) {
        const productId = parseInt(event.target.getAttribute('data-id'));
        const productToAdd = products.find(p => p.id === productId);
        
        if (productToAdd) {
            cart.push(productToAdd);
            saveCartToStorage();
            renderCart();
            
            const originalText = event.target.textContent;
            event.target.textContent = '✓ Додано';
            event.target.style.backgroundColor = '#10b981';
            
            setTimeout(() => {
                event.target.textContent = originalText;
                event.target.style.backgroundColor = '';
            }, 1000);
        }
        return;
    }

    const card = event.target.closest('.product-card');
    
    if (card) {
        const productId = parseInt(card.getAttribute('data-card-id'));
        const product = products.find(p => p.id === productId);
        
        if (product) {
            modalDetails.innerHTML = `
                <div class="modal-product-layout">
                    <img src="${product.image}" alt="${product.title}">
                    <div class="modal-info">
                        <h3>${product.title}</h3>
                        <p>${product.description}</p>
                        <p style="font-size: 0.9rem; color: #64748b; margin-top: 1rem;">
                            <strong>Артикул:</strong> #TS-00${product.id}<br>
                            <strong>Наявність:</strong> На складі<br>
                            <strong>Гарантія:</strong> 12 місяців від виробника
                        </p>
                        <p class="price">${product.price} ₴</p>
                    </div>
                </div>
            `;
            // Показуємо модальне вікно
            modal.classList.add('show');
        }
    }
});

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
        modal.classList.remove('show');
    });
}

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.classList.remove('show');
    }
});

cartContent.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-btn')) {
        const itemIndex = parseInt(event.target.getAttribute('data-index'));
        
        cart.splice(itemIndex, 1);
        saveCartToStorage();
        
        renderCart();
    }
});

renderCart();


// Підрахунок суми через reduce() 
function renderCart() {
    const cartTotalBlock = document.getElementById('cart-total');
    const cartTotalSpan = document.querySelector('#cart-total span');

    if (cart.length === 0) {
        cartContent.innerHTML = '<p>Тут з\'являться обрані товари. Кошик наразі порожній.</p>';
        cartTotalBlock.style.display = 'none'; 
        return;
    }

    cartContent.innerHTML = ''; 
    
    cart.forEach((item, index) => {
        const cartItemHTML = `
            <div class="cart-item">
                <span class="cart-item-title">${item.title}</span>
                <span class="cart-item-price">${item.price} ₴</span>
                <button class="remove-btn" data-index="${index}">Видалити</button>
            </div>
        `;
        cartContent.insertAdjacentHTML('beforeend', cartItemHTML);
    });

    const totalPrice = cart.reduce((total, item) => {
        return total + item.price;
    }, 0);

    cartTotalSpan.textContent = `${totalPrice} ₴`;
    cartTotalBlock.style.display = 'block';
}


//Авторизація та Профіль 
let currentUser = JSON.parse(localStorage.getItem('techSupplyUser')) || null;
const loginWrapper = document.getElementById('login-wrapper');
const userDashboard = document.getElementById('user-dashboard');
const loginForm = document.getElementById('login-form');

function renderOrderHistory() {
    const historyContainer = document.getElementById('order-history-container');
    const allOrders = JSON.parse(localStorage.getItem('techSupplyOrders')) || [];
    const userOrders = allOrders.filter(order => order.userEmail === currentUser.email);

    if (userOrders.length === 0) {
        historyContainer.innerHTML = '<p>У вас ще немає замовлень.</p>';
        return;
    }

    historyContainer.innerHTML = '';
    userOrders.reverse().forEach(order => {
        const orderHTML = `
            <div style="border: 1px solid #cbd5e1; border-radius: 6px; padding: 1rem; margin-bottom: 1rem; background: white;">
                <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.5rem; margin-bottom: 0.5rem;">
                    <strong>Замовлення ${order.id}</strong>
                    <span style="color: #64748b;">${order.date}</span>
                </div>
                <ul style="list-style: none; margin-bottom: 1rem; padding-left: 0;">
                    ${order.items.map(item => `<li>- ${item.title} (${item.price} ₴)</li>`).join('')}
                </ul>
                <div style="text-align: right; font-weight: bold; color: var(--primary-color);">
                    Сума: ${order.total} ₴
                </div>
            </div>
        `;
        historyContainer.insertAdjacentHTML('beforeend', orderHTML);
    });
}

function renderProfileUI() {
    const profileIcon = document.getElementById('profile-icon-btn');
    
    if (currentUser) {
        loginWrapper.style.display = 'none';
        userDashboard.style.display = 'block';
        document.getElementById('display-user-name').textContent = `Вітаємо, ${currentUser.name}!`;
        document.getElementById('display-user-email').textContent = currentUser.email;
        
        profileIcon.style.color = '#10b981'; 
        profileIcon.title = `Профіль: ${currentUser.name}`;
        
        renderOrderHistory();
    } else {
        loginWrapper.style.display = 'block';
        userDashboard.style.display = 'none';
        
        profileIcon.style.color = ''; 
        profileIcon.title = "Увійти в кабінет";
    }
}

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value.trim();
        const name = document.getElementById('login-name').value.trim();
        currentUser = { email, name };
        localStorage.setItem('techSupplyUser', JSON.stringify(currentUser));
        renderProfileUI();
    });
}

const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        currentUser = null;
        localStorage.removeItem('techSupplyUser');
        renderProfileUI();
    });
}

renderProfileUI();