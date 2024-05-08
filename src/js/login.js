'use strict';

//Variabler
const form = document.querySelector('form');
const button = document.querySelector('button');
const errorSpan = document.querySelector('span.error');
const apiUrl = 'https://loginapi-saz1.onrender.com/';

form.addEventListener('submit', (e) => {
    e.preventDefault();
    loginUser();
});

async function loginUser() {
    errorSpan.textContent = '';
    button.textContent = 'Loggar in...';

    //Värden
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    //Fetchanrop till post /login
    try {
        const response = await fetch(apiUrl + 'login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-type': 'application/json' },
        });
        const data = await response.json();
        //Kolla vad vi fick för meddelanden, skriv ut till span.error om error

        if (data.errors) {
            errorSpan.textContent = data.errors.message;
            button.textContent = 'Logga in';
            //Avsluta funktion
            return;
        }
        //Ta token, peta in den i en cookie och lagra i 1h (token går ut efter 1 timme)
        const token = data.token;
        document.cookie = `jwt=${token}; max-age=3600; path=/;`;

        // Gör ett fetch-anrop till den skyddade routen med JWT-token
        const protectedResponse = await fetch(apiUrl + 'protected', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const protectedData = await protectedResponse.json();

        // Om svaret är access granted, skicka till userpage
        if (protectedData.message === 'Access granted') {
            sessionStorage.setItem('username', JSON.stringify(protectedData.username.username));
            location.href = 'userpage.html';
        } else {
            // Visa felmeddelande annars, skicka tillbaks till logga in
            errorSpan.textContent = 'Felaktig token';
            button.textContent = 'Logga in';
        }
    } catch (error) {
        console.error(error);
        errorSpan.textContent = `Något gick fel: ${error}`;
    }
}
