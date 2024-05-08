'use strict';

//Variabler
const form = document.querySelector('form');
const button = document.querySelector('button.action');
const apiUrl = 'https://loginapi-saz1.onrender.com/';
const spanError = document.querySelector('span.error');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    createAccount();
});

async function createAccount() {
    spanError.textContent = '';
    //Formulärvärden
    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    //Fetch POST till /signup
    try {
        spanError.textContent = '';
        button.textContent = 'Skapar konto...';

        const response = await fetch(apiUrl + 'signup', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });
        const data = await response.json();

        if (data.errors) {
            //Skriv ut alla error till skärmen om de finns
            spanError.textContent = data.errors.join(', ');
            button.textContent = 'Skapa konto';
            return;
        }

        //Skapa token och peta in i cookie
        const token = data.token;
        document.cookie = `jwt=${token}; max-ag=3600; path=/;`;

        //Gör fetchanrop för att logga in
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
            spanError.textContent = 'Felaktig token';
            button.textContent = 'Skapa konto';
        }
    } catch (error) {
        spanError.textContent = error;
        console.log('Fel: ' + error);
    }
}
