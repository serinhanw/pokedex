let pokemonRepository = (function (){

  let modalContainer = document.querySelector('#modal-container');
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let pokemonList = [];

  function add(pokemon) {
    if (typeof pokemon === 'object' && 'name' in pokemon && 'url' in pokemon) { //&& 'detailsUrl' in pokemon) { // && 'height' in pokemon && 'abilities' in pokemon && 'type' in pokemon) {
    pokemonList.push(pokemon);
    }
    else if (!('name' in pokemon && 'url' in pokemon)) {
      console.error('Please provide the following keys to successfully push Pokemon: name and detailsUrl');
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
    button.classList.add('pokemon-list-button');
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);

    // when user clicks on a Pokemon button, click event will ensue which means function inside will be called upon
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      // console.log(pokemon);
      showModal(pokemon);
    });
  }

  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) { //results is one of the objects in api (ex.'count', 'next', 'previous', 'results')
        let pokemon = { //item is one object containing 2 keys: name & url !!
          name: item.name,
          url: item.url
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
    let detailsUrl = item.url;
    return fetch(detailsUrl).then(function (response) {
      return response.json();
    }).then(function (details) { //details meaning all the info when 'url' is clicked
      item.imageUrl = details.sprites.other.dream_world.front_default;
      item.height = details.height;
      item.weight = details.weight;
      item.types = [];
        for (let i = 0; i < details.types.length; i++) {
          item.types.push(details.types[i].type.name);
        };
      item.abilities = [];
        for (let i = 0; i < details.abilities.length; i++) {
          item.abilities.push(details.abilities[i].ability.name);
        };
      hideLoadingMessage();
    }).catch(function () { //(e)
      // if (typeof url === 'undefined') {
      //   console.log('Must include detailsUrl.');
      // }
      console.error(e);
    });
  }

  function showModal(pokemon) {
    let entireBackground = document.querySelector('#entire-background');

    modalContainer.innerHTML = '';
    entireBackground.classList.add('background-opacity');


    let modal = document.createElement('div');
    modal.classList.add('modal');
    modal.classList.add('fadeIn');

    let modalImage = document.createElement('img');
    modalImage.classList.add('modal-pokemon-img');
    modalImage.alt = 'Image ofPokemon';
    modalImage.src = pokemon.imageUrl;



    let modalTitle = document.createElement('h1');
    modalTitle.innerText = pokemon.name;

    let modalContent = document.createElement('p');
    modalContent.innerHTML =
    ('<p>'+ '<b>Height: </b>' + pokemon.height + '</p>') + ('<p>'+ '<b>Weight: </b>' + pokemon.weight + '</p>') + ('<p>'+ '<b>Type(s): </b>' + pokemon.types + '</p>') + ('<p>'+ '<b>Abilities: </b>' + pokemon.abilities + '</p>');

    let closeButton = document.createElement('button');
    closeButton.classList.add('modal-close');
    closeButton.innerHTML = '&times';
    closeButton.addEventListener('click', hideModal);

    modalContainer.appendChild(modal);
    modal.appendChild(closeButton);
    modal.appendChild(modalImage);
    modal.appendChild(modalTitle);
    modal.appendChild(modalContent);
    // modal.appendChild(closeButton);

    modalContainer.classList.add('is-visible');

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modalContainer.classList.contains('is-visible')) {
        hideModal();
      }
    });

    modalContainer.addEventListener('click', (e) => {
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });
}

  function hideModal() {
    let modal = document.querySelector('.modal');
    let entireBackground = document.querySelector('#entire-background');
    modal.classList.remove('fadeIn');
    modalContainer.classList.remove('is-visible');
    entireBackground.classList.remove('background-opacity');
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
    loadDetails: loadDetails,
    showDetails: showDetails
  };

})();

console.log(pokemonRepository.getAll());

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});




// document.write('<hr>');
