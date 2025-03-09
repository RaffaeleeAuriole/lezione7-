let btn = document.querySelector(".fetch-user");
let url = "https://randomuser.me/api/";
let userContainer = document.querySelector("#user-container");

btn.addEventListener("click", function(e) {
    e.preventDefault();

    console.log("Pulsante cliccato, avvio richiesta API...");

    // Mostra un messaggio di caricamento
    userContainer.textContent = "Caricamento in corso...";

    fetch(url)
        .then(function(resp) {
            if (!resp.ok) {
                throw new Error("Errore nella richiesta: " + resp.status);
            }
            console.log("Risposta API ricevuta:", resp);
            return resp.json();
        })
        .then(function(data) {
            console.log("Dati utente ricevuti:", data);

            if (!data || !data.results || data.results.length === 0) {
                throw new Error("Nessun dato utente trovato");
            }

            let user = data.results[0];
            let address = user.location.street.number + " " +
                         user.location.street.name + ", " +
                         user.location.city + ", " +
                         user.location.state + ", " +
                         user.location.postcode;

            // Pulisci il contenitore
            userContainer.textContent = "";

            // Crea e aggiunge elementi
            function aggiungiTesto(testo) {
                let p = document.createElement("p");
                p.textContent = testo;
                userContainer.appendChild(p);
            }

            aggiungiTesto("Nome: " + user.name.first + " " + user.name.last);
            aggiungiTesto("Sesso: " + user.gender);
            aggiungiTesto("Indirizzo: " + address);
            aggiungiTesto("Email: " + user.email);
            aggiungiTesto("Telefono: " + user.phone);
            aggiungiTesto("Registrato il: " + new Date(user.registered.date).toLocaleDateString());
        })
        .catch(function(err) {
            console.error("Errore durante la richiesta:", err);

            // Messaggio di errore dettagliato
            if (err.message.includes("Failed to fetch")) {
                userContainer.textContent = "Errore di rete: impossibile connettersi all'API. Verifica la connessione Internet.";
            } else {
                userContainer.textContent = "Errore: " + err.message;
            }
        });
});