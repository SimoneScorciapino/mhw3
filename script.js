

function onJson(json){
	console.log("json ricevuto");
	console.log(json);
	const result = 0; //voglio visualizzare solo primo risultato
	const dati_generali = document.querySelector('#player-view');
	dati_generali.innerHTML = '';
	const doc = json.response[result];
	
	const name_player = doc.firstname;
	const lastname_player = doc.lastname;
	const altezza = doc.height.meters;
	const num_maglia = doc.leagues.standard.jersey;
	const id = doc.id;

	const visuale = document.createElement('div');
	
	visuale.classList.add('risultato');
	const nome = document.createElement('h2');
	const congnome = document.createElement('h3');
	const height = document.createElement('span');
	const number = document.createElement('span');
	const identificativo = document.createElement('span');

	nome.textContent = 'Nome: ' +  name_player;
	congnome.textContent = 'Cognome: '+ lastname_player;
	height.textContent = 'Altezza: ' +  altezza;
	number.textContent = 'N. Maglia: ' +  num_maglia;
	identificativo.textContent = 'ID giocatore: ' + id;

	visuale.appendChild(nome);
	visuale.appendChild(congnome);
	visuale.appendChild(height);
	visuale.appendChild(number);
	visuale.appendChild(identificativo);
	dati_generali.appendChild(visuale);
	//carico i valori del json all'interno dell'html

	fetch('https://api-nba-v1.p.rapidapi.com/players/statistics?id=' + id +'&season=2020', { /*seconda api: dato l'id di un giocatore restituisce
			le sue statistiche  relative a : squadra in cui ha giocato, posizione % di tiro e rimbalzi nella stagione 2019/2020 */
	method: "GET",
	headers: {
		"x-rapidapi-host":  'api-nba-v1.p.rapidapi.com', //key
		"x-rapidapi-key":  '7a9e317c3bmsha1f56fa17bdf216p10a41ajsn6a35b35be81b',
	}
}).then(onResponse2,onError2).then(onJson2);

}

function onJson2(json){
    console.log("Json Ricevuto");
	const result = 0; //voglio visualizzare solo il primo risultato pertanto setto sempre l'indice del json ricavato a zero
	const statistiche = document.querySelector('#statistic-view');
	statistiche.innerHTML = ''; //utile allo svuotamento
	const resp = json.response[result];

	const name_team = resp.team.name;
	const image = resp.team.logo;
	const points = resp.points;
	const role = resp.pos;
	const fgp = resp.fgp;
	const reb = resp.totReb;

	const stat = document.createElement('div');
	stat.classList.add('risultato');

	const img = document.createElement('img');
	img.src = image;
	const nome_team = document.createElement('h3');
	nome_team.textContent = 'Squadra di Appartenenza: ' + name_team;
	const punti = document.createElement('span');
	punti.textContent = 'Punti per partita: ' + points;
	const ruolo = document.createElement('span');
	ruolo.textContent = 'Posizione: ' + role;
	const tiri_campo = document.createElement('span');
	tiri_campo.textContent = ' % di tiri dal campo: ' + fgp;
	const rimbalzi = document.createElement('span');
	rimbalzi.textContent = 'Rimbalzi per Partita : ' + reb;
	stat.appendChild(nome_team);
	stat.appendChild(img);
	stat.appendChild(punti);
	stat.appendChild(ruolo);
	stat.appendChild(tiri_campo);
	stat.appendChild(rimbalzi);

	statistiche.appendChild(stat);
}

function onResponse(response){
	
	return response.json();
}

function onError(response){
	console.log("Erroe");
}

function cerca(event){
	event.preventDefault();
	const valore_input = document.querySelector('#player');
	const valore = encodeURIComponent(valore_input.value);
fetch("https://api-nba-v1.p.rapidapi.com/players?name=" + valore, { /*prima api: dato il nome del giocatore vengono restituite alcune 
			generalita quali il nome, cognome, altazza, nunmero di maglia e identificativo*/
	method: "GET",
	headers: {
		"x-rapidapi-host":  'api-nba-v1.p.rapidapi.com',
		"x-rapidapi-key":  '7a9e317c3bmsha1f56fa17bdf216p10a41ajsn6a35b35be81b',
	}
}).then(onResponse,onError).then(onJson);
}

//seleziono il form e gli associo la funzione di ricerca
const form = document.querySelector('#player_1');
form.addEventListener('submit',cerca);


function onResponse2(response){
	
	return response.json();
}
function onError2(response){
	console.log("Erroe");
}

