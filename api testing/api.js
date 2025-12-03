import { MY_API_KEY } from './config.js';

fetch("http://www.omdbapi.com/?i=tt3896198&apikey=c7425a42",{
    "method":"GET",
    "headers": {
		'x-rapidapi-key': '5deaf2ce64msh9927ce6453b4f7ap16310cjsnb2d39c661538',
		'x-rapidapi-host': 'quotes15.p.rapidapi.com'
	}
})
.then(response => response.json())
.then(response => {
    console.log(response);
    console.log(response.content);

    document.getElementById('quote').innerHTML = response.content;
    document.getElementById('author').innerHTML = '- ' + response.originator.name + ' -';
})
.catch(err => {
    console.log(err);
})


