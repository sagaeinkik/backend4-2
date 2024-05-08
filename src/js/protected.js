'use strict';
import duckImg from '../assets/duck.svg';

document.addEventListener('DOMContentLoaded', checkUser);

function checkUser() {
    const tokenCookie = getCookie('jwt=');
    if (!tokenCookie) {
        window.location = 'login.html';
    } else {
        //Hämta namnet från sessionStorage
        let username = sessionStorage.getItem('username');
        //Ta bort citattecken
        username = username.replace(/^"(.*)"$/, '$1');
        // Skapa nav
        const nav = document.createElement('nav');
        nav.classList.add('protectedpage');
        // Skapa logga ut-knapp
        const logoutBtn = document.createElement('button');
        logoutBtn.classList.add('logout');
        logoutBtn.textContent = 'Logga ut';
        //Lägg till i meny
        nav.appendChild(logoutBtn);

        // Skapa bilden
        const img = document.createElement('img');
        img.src = duckImg;
        img.setAttribute('alt', 'Isometrisk bild av en anka');

        // Skapa välkomstdelen
        const welcomeDiv = document.createElement('div');
        welcomeDiv.classList.add('welcome');
        const h1 = document.createElement('h1');
        h1.textContent = 'Välkommen ' + username;
        const p = document.createElement('p');
        p.textContent =
            'Det här ska vara en skyddad sida som man bara kommer åt om man är registrerad som användare och inloggad.';
        welcomeDiv.appendChild(img);
        welcomeDiv.appendChild(h1);
        welcomeDiv.appendChild(p);

        // Hämta wrapper-elementet och lägg till navigationsmenyn och välkomstdelen
        const wrapper = document.querySelector('div.wrapper');
        wrapper.innerHTML = ''; // Rensa eventuellt befintligt innehåll
        wrapper.appendChild(nav);
        wrapper.appendChild(welcomeDiv);

        // Lägg till eventlyssnare för logga ut-knappen
        logoutBtn.addEventListener('click', logoutUser);
    }
}

function getCookie(cookieName) {
    //Lägg alla kakor i array, kolla igenom om en kaka matchar jwt=
    return document.cookie.split(';').some((cookie) => cookie.trim().startsWith(cookieName));
}

function logoutUser() {
    //ändra cookiens expiration-date till redan passerat datum
    document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    //Töm session Storage
    sessionStorage.clear();
    //Skicka till startsida
    window.location.href = 'index.html';
}
