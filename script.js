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