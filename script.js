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
            <div class="product-card">
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
        }
    });
}