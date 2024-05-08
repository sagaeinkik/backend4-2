'use strict';

//Variabler
const form = document.querySelector('form');
const button = document.querySelector('button');
const errorSpan = document.querySelector('span.error');
const apiUrl = 'https://loginapi-saz1.onrender.com/login';

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
        const response = await fetch(apiUrl, {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-type': 'application/json' },
        });
        const data = await response.json();
        //Kolla vad vi fick för meddelanden, skriv ut till span.error om error
        console.log(data);
        if (data.errors) {
            errorSpan.textContent = data.errors.message;
            button.textContent = 'Logga in';
            //Avsluta funktion
            return;
        }
        //Ta token, peta in den i en cookie och lagra i 1h (token går ut efter 1 timme)
        const token = data.token;
        document.cookie = `jwt=${token}; max-age=3600; path=/;`;

        //Dirigera en till protected-sida
        location.href = 'userpage.html';
    } catch (error) {
        console.error(error);
        errorSpan.textContent = `Något gick fel: ${error}`;
    }
}
