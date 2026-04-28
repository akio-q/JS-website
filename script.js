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
const services = [
    { 
        id: 1, 
        title: 'Розробка корпоративного сайту', 
        price: 25000, 
        description: 'Створення багатосторінкового сайту з індивідуальним дизайном та панеллю управління.', 
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80' 
    },
    { 
        id: 2, 
        title: 'SEO оптимізація', 
        price: 8000, 
        description: 'Комплексне просування веб-ресурсу в пошукових системах для збільшення органічного трафіку.', 
        image: 'https://images.unsplash.com/photo-1572177812156-58036aae439c?w=400&q=80' 
    },
    { 
        id: 3, 
        title: 'UX/UI Аудит', 
        price: 5000, 
        description: 'Глибокий аналіз користувацького інтерфейсу та надання рекомендацій щодо покращення конверсії.', 
        image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&q=80' 
    },
    { 
        id: 4, 
        title: 'Налаштування хмарного сервера', 
        price: 4500, 
        description: 'Розгортання, базове налаштування та оптимізація безпеки веб-сервера (AWS, DigitalOcean).', 
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80' 
    },
    { 
        id: 5, 
        title: 'Технічна підтримка 24/7', 
        price: 3000, 
        description: 'Щомісячне обслуговування, резервне копіювання та моніторинг працездатності системи.', 
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80' 
    },
    { 
        id: 6, 
        title: 'Розробка мобільного додатка', 
        price: 45000, 
        description: 'Створення кросплатформних рішень на React Native для iOS та Android.', 
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80' 
    },
    { 
        id: 7, 
        title: 'Кібербезпека: Аудит', 
        price: 12000, 
        description: 'Пошук вразливостей у вашій системі та захист від потенційних DDoS-атак.', 
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&q=80' 
    },
    { 
        id: 8, 
        title: 'Оптимізація баз даних', 
        price: 7500, 
        description: 'Аналіз SQL-запитів та налаштування індексів для прискорення роботи додатка.', 
        image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&q=80' 
    },
    { 
        id: 9, 
        title: 'QA: Тестування ПЗ', 
        price: 6000, 
        description: 'Автоматизоване та мануальне тестування функціоналу перед релізом.', 
        image: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?w=400&q=80' 
    },
    { 
        id: 10, 
        title: 'Брендинг та Айдентика', 
        price: 15000, 
        description: 'Розробка логотипа, фірмового стилю та брендбука для IT-компаній.', 
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80' 
    },
    { 
        id: 11, 
        title: 'Інтеграція платіжних систем', 
        price: 5500, 
        description: 'Підключення Stripe, PayPal або MonoPay до вашого інтернет-магазину.', 
        image: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=400&q=80' 
    },
    { 
        id: 12, 
        title: 'API Розробка', 
        price: 11000, 
        description: 'Проектування та створення RESTful API для взаємодії між сервісами.', 
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80' 
    }
];

const ordersContainer = document.getElementById('orders-container');
const searchInput = document.getElementById('search-input');

function renderCards(items) {
    ordersContainer.innerHTML = '';
    
    items.forEach(item => {
        const cardHTML = `
            <div class="product-card">
                <img src="${item.image}" alt="${item.title}">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <p class="price">${item.price} ₴</p>
                <button class="order-btn" data-id="${item.id}">Оформити замовлення</button>
            </div>
        `;
        ordersContainer.insertAdjacentHTML('beforeend', cardHTML);
    });
}

renderCards(services);

searchInput.addEventListener('input', (event) => {
    const query = event.target.value.toLowerCase().trim();
    
    const filteredServices = services.filter(service => 
        service.title.toLowerCase().includes(query)
    );
    
    renderCards(filteredServices);
});