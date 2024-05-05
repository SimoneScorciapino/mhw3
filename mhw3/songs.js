function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json();
  }
function search(event) {
    // Impedisci il submit del form
    event.preventDefault();
    // Leggi valore del campo di testo
    const album_input = document.querySelector('#album');
    const album_value = encodeURIComponent(album_input.value);
    console.log('Eseguo ricerca: ' + album_value);
    // Esegui la richiesta
    fetch("https://api.spotify.com/v1/search?q=" + album_value + "&type=track", {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(onResponse)
        .then(onJson);
}

function getFoodItem(albumYear) {
    const sushi = [
        { name: "Nigiri 1", price: "€9", description: "Special Nigiri Salmone e uova di Salmone 2 pz." },
        { name: "Uramaki 10", price: "€10", description: "Salmone, philadelphia, avocado, cipolla croccante 10 pz." }
        // Aggiungi altri piatti di sushi
    ];

    const antipasti = [
        { name: "Fritto Misto", price: "€10", description: "fiori di zucca, anelli di cipolla, crocchette, pioggia di crema di pistacchio" }
        // Aggiungi altri antipasti
    ];

    const pizza = [
        { name: "Biancaneve", price: "€6", description: "Mozzarella fiordilatte, olio evo." },
        { name: "Margherita", price: "€7", description: "Salsa di pomodoro, mozzarella fiordilatte, basilico, olio evo." }
        // Aggiungi altre pizze
    ];

    if (albumYear >= 2000 && albumYear <= 2010) {
        return sushi[Math.floor(Math.random() * sushi.length)];
    } else if (albumYear > 2010 && albumYear <= 2020) {
        return antipasti[Math.floor(Math.random() * antipasti.length)];
    } else {
        return pizza[Math.floor(Math.random() * pizza.length)];
    }
}

function onJson(json) {
    console.log('JSON ricevuto');
    // Svuotiamo la libreria
    const library = document.querySelector('#album-view');
    library.innerHTML = '';

    const results = json.tracks.items;

    if (results.length > 0) {
        const album_data = results[0];
        // Leggiamo info
        const title = album_data.name;
        const selected_image = album_data.album.images[0].url;
        const nome_album = album_data.album.name;
        const nome_artist = album_data.album.artists[0].name;
        console.log(nome_artist);
        console.log(nome_album);

        // Otteniamo l'anno di uscita dell'album
        const albumYear = new Date(album_data.album.release_date).getFullYear();

        // Scegliamo un elemento casuale del cibo in base all'anno di uscita dell'album
        const foodItem = getFoodItem(albumYear);

        if (foodItem) {
            // Creiamo il div che conterrà immagine e didascalia
            const album = document.createElement('div');
            album.classList.add('album');
            // Creiamo l'immagine
            const img = document.createElement('img');
            img.src = selected_image;
            // Creiamo la didascalia
            const caption = document.createElement('span');
            caption.innerHTML = "<strong>Artista:</strong> " + nome_artist + "<br><strong>Album:</strong> " + nome_album + "<br><strong>Brano:</strong> " + title + "<br><br><strong>Consiglio Culinario:</strong> " + foodItem.name + " - " + foodItem.description + " (" + foodItem.price + ")";
            // Aggiungiamo immagine e didascalia al div
            album.appendChild(img);
            album.appendChild(caption);
            // Aggiungiamo il div alla libreria
            library.appendChild(album);
        } else {
            const noResults = document.createElement('p');
            noResults.textContent = 'Nessun risultato trovato';
            library.appendChild(noResults);
        }
    }
}
function onTokenJson(json)
  {
    // Imposta il token global
    token = json.access_token;
    
  }
  
  function onTokenResponse(response)
  {
    return response.json();
  }
// Aggiungi event listener al form
const form = document.querySelector('form');
form.addEventListener('submit', search);
const client_id = '9d4928eb8e10469c939c827d40b69f2a';
  const client_secret = 'c533c8ef6843476eb2732d3b047aa655';

let token;
// All'apertura della pagina, richiediamo il token
fetch("https://accounts.spotify.com/api/token", {
        method: "post",
        body: 'grant_type=client_credentials',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
        }
    })
    .then(onTokenResponse)
    .then(onTokenJson);
