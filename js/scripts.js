let pokemonRepository = (function (){

  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    if (typeof pokemon === 'object' && 'name' in pokemon) { //&& 'detailsUrl' in pokemon) { // && 'height' in pokemon && 'abilities' in pokemon && 'type' in pokemon) {
    pokemonList.push(pokemon);
    }
    else  {
      console.log('Insufficient.');
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);

    // when user clicks on a Pokemon button, click event will ensue which means function inside will be called upon
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });

  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon); // or (pokemon.name, pokemon.detailsUrl)
    });
  }

  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      // hideLoadingMessage();
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
      add(pokemon);
      //console.log(pokemon);
      });
      hideLoadingMessage();
    }).catch(function (e) {
      console.error(e);
    });
  }

  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) { //details meaning all the info when 'url' is clicked
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types.forEach(function(type) {
        return type.name;
      });
      hideLoadingMessage();
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showLoadingMessage() {
    let pokemonList = document.querySelector('.pokemon-list');
    let loader = document.createElement('div');
    loader.classList.add('loader');
    pokemonList.appendChild(loader);
  }

  function hideLoadingMessage() {
    let loader = document.querySelector('.loader');
    loader.classList.remove('loader');
    loader.classList.add('hide');
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  };

})();


console.log(pokemonRepository.getAll());




pokemonRepository.add('Lillipup');
pokemonRepository.add({ name: 'Lillipup', height: 1.04, abilities: ['vital spirit', ' pickup'], type: 'normal' });
console.log(pokemonRepository.getAll());

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});




// document.write('<hr>');
