# Moment 4.2

av S.E.K för moment 4 i Backendbaserad Webbutveckling på Mittuniversitetet

## Bakgrund

Jag har skapat ett API som hanterar användarkonton. Man kan skapa nytt konto och logga in med det. API:et innehåller också en skyddad route som kräver en giltig jsonwebtoken för att komma åt. Detta API finns publicerat på https://github.com/sagaeinkik/loginAPI.

Sedan har jag skapat en webbplats som användargränssnitt för att skapa en ny användare och/eller logga in, och på så vis komma åt en skyddad sida som man måste ha en användare för att få se.

## Lösning

För att åstadkomma detta har jag gjort userpage.html, länkat som Mina Sidor. Om man inte har en giltig cookie med en jsonwebtoken lagrat i den så dirigeras man till inloggningssidan. Ett problem att lösa var att man kan stänga av JavaScript i sin webbläsare och på så vis ändå se den skyddade sidan. För att komma runt det så genererar JavaScript innehållet på den skyddade sidan; har man då stängt av JavaScript får man alltså inte fram något innehåll.

Det är en enkel lösning och det finns säkerligen många bättre, men för den här sidan fungerar det.

## Funktionalitet

För att skapa en ny användare måste man följa reglerna som finns definierade i mongoose-schemat för databasen. När man har skapat en ny användare loggas man automatiskt in och kommer till den skyddade sidan.

På den skyddade sidan finns en logga ut-knapp, som tar bort lagringen av jsonwebtoken och därmed låser ner den skyddade sidan från åtkomst utan inloggning igen.

Om man från den skyddade sidan manuellt går till startsidan, och trycker på Mina Sidor därifrån, kommer man direkt in på userpage.html.
