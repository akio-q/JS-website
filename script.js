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
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.page-section');

    navButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const targetId = event.target.getAttribute('data-target');

            navButtons.forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');

            sections.forEach(section => {
                section.classList.remove('active'); 
                
                if (section.id === targetId) {
                    section.classList.add('active');
                }
            });
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
const products = [
    { 
        id: 1, 
        title: 'Ноутбук Dell XPS 15', 
        price: 65000, 
        description: 'Професійний ноутбук для роботи з графікою та кодом. 32GB RAM, 1TB SSD.', 
        image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&q=80' 
    },
    { 
        id: 2, 
        title: 'Ергономічне крісло', 
        price: 18500, 
        description: 'Преміальне офісне крісло з підтримкою попереку для тривалої роботи за комп\'ютером.', 
        image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=400&q=80' 
    },
    { 
        id: 3, 
        title: 'Монітор LG UltraFine 4K', 
        price: 22000, 
        description: '27-дюймовий IPS монітор з ідеальною передачею кольорів для дизайнерів та розробників.', 
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80' 
    },
    { 
        id: 4, 
        title: 'БФП HP LaserJet Pro', 
        price: 14500, 
        description: 'Швидкий лазерний принтер, сканер та копір для корпоративного використання.', 
        image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400&q=80' 
    },
    { 
        id: 5, 
        title: 'Серверна шафа APC 42U', 
        price: 35000, 
        description: 'Надійна стійка для безпечного розміщення мережевого обладнання дата-центру.', 
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80' 
    },
    { 
        id: 6, 
        title: 'Маршрутизатор Cisco', 
        price: 28000, 
        description: 'Гігабітний роутер для забезпечення стабільної та захищеної корпоративної мережі.', 
        image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&q=80' 
    },
    { 
        id: 7, 
        title: 'Джерело безперебійного живлення', 
        price: 15000, 
        description: 'ДБЖ на 1500VA для захисту робочих станцій від перепадів напруги та втрати даних.', 
        image: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=400&q=80' 
    },
    { 
        id: 8, 
        title: 'Конференц-камера 4K', 
        price: 21000, 
        description: 'Ширококутна камера з вбудованим спрямованим мікрофоном для переговорних кімнат.', 
        image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400&q=80' 
    },
    { 
        id: 9, 
        title: 'Інтерактивна панель 65"', 
        price: 85000, 
        description: 'Сенсорний екран для проведення презентацій та спільної роботи команд у реальному часі.', 
        image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&q=80' 
    },
    { 
        id: 10, 
        title: 'Мережеве сховище NAS', 
        price: 16000, 
        description: 'Сервер для резервного копіювання та захищеного зберігання корпоративних файлів на 16TB.', 
        image: 'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=400&q=80' 
    },
    { 
        id: 11, 
        title: 'Ергономічна клавіатура', 
        price: 4500, 
        description: 'Бездротова клавіатура з підставкою для зап\'ястя, що знижує навантаження під час тривалого друку.', 
        image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=400&q=80' 
    },
    { 
        id: 12, 
        title: 'Професійна гарнітура', 
        price: 6200, 
        description: 'Навушники з активним шумозаглушенням та чітким мікрофоном для важливих відеодзвінків.', 
        image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&q=80' 
    }
];

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

renderCards(products);

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
            formMessage.textContent = `Дякуємо, ${name}! Ваша заявка прийнята.`;
            formMessage.classList.add('success');
            
            checkoutForm.reset();

            cart = []; 
            saveCartToStorage(); 
            renderCart();
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