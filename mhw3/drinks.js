
function onJson(json)
{
    console.log('json ricevuto');
    //svuoto la libreria
    const drink = document.querySelector('#drink-view');
    drink.innerHTML = '';
    let name = json.drinks[0].strDrink;
    console.log(name);
    let image = json.drinks[0].strDrinkThumb;
    let descrizione = json.drinks[0].strInstructionsIT;
    const cocktail = document.createElement('div');
    cocktail.classList.add('cocktail');
    const img = document.createElement('img');
    img.src = image.replace(/\\/g, '');
    img.src = image;
    //creo la didascalia
    const caption = document.createElement('h1');
    const desc = document.createElement('span');
    caption.textContent = name;
    desc.textContent = descrizione;
    //aggiungo immagine e didascalia al div
    cocktail.appendChild(img);
    cocktail.appendChild(caption);
    cocktail.appendChild(desc);
    //aggiungo il div alla libreria
    drink.appendChild(cocktail);
}
   
function onResponse(response)
{
    console.log('risposta ricevuta');
    return response.json();
}

function search(event)
{
    event.preventDefault();
    const cocktail_input = document.querySelector('#cocktail');
    const cocktail_value = encodeURIComponent(cocktail_input.value);
    console.log('Eseguo ricerca: ' + cocktail_value);
    rest_url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + cocktail_value;
    fetch(rest_url).then(onResponse).then(onJson);
}
const form = document.querySelector('form');
form.addEventListener('submit',search)