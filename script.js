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