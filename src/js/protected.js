'use strict';

const logoutBtn = document.querySelector('.logout');

window.addEventListener('load', checkUser);

function checkUser() {
    const tokenCookie = getCookie('jwt=');
    if (!tokenCookie) {
        window.location = 'login.html';
    } else {
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
    //Skicka till startsida
    window.location.href = 'index.html';
}
