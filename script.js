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