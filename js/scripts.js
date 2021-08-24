let pokemonRepository = (function (){

  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let pokemonList = [];

  function add(pokemon) {
    if (typeof pokemon === 'object' && 'name' in pokemon && 'url' in pokemon) {
    pokemonList.push(pokemon);
    }
    else if (!('name' in pokemon && 'url' in pokemon)) {
      console.error('Please provide the following keys to successfully push Pokemon: name and detailsUrl');
    }
  }

  function getAll() {
    return pokemonList;
  }

  // Includes Bootstrap classes eg. .list-group
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.list-group');
    let listItem = document.createElement('li');
    listItem.classList.add('list-group-item');
    listItem.classList.add('border-0');

    let buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('list-button');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#exampleModal');

    buttonContainer.appendChild(button);

    listItem.appendChild(buttonContainer);
    pokemonList.appendChild(listItem);

    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          url: item.url
        };
      add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    });
  }

  function loadDetails(item) {
    let detailsUrl = item.url;
    return fetch(detailsUrl).then(function (response) {
      return response.json();
    }).then(function (details) {
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
    }).catch(function () {
      console.error(e);
    });
  }

  // Includes Bootstrap & jQuery examples
  function showModal(pokemon) {
    let modalTitle = $('.modal-title');
    let modalBody = $('.modal-body');

    modalTitle.empty(); // jQuery equivalent to modalTitle.innerHTML='';
    modalBody.empty();

    let nameElement = $('<h1>' + pokemon.name + '</h1>');

    let imageElement = $('<img class="modal-img" style="width:50%">');
    imageElement.attr('src', pokemon.imageUrl);
    imageElement.attr('alt', 'Image of Pokemon');

    let heightElement = $('<p><b>' + 'height: </b>' + pokemon.height + '</p>');
    let weightElement = $('<p><b>' + 'weight: </b>' + pokemon.weight + '</p>');
    let typeElement = $('<p><b>' + 'type(s): </b>' + pokemon.types + '</p>');
    let abilityElement = $('<p><b>' + 'abilities: </b>' + pokemon.abilities + '</p>');

    modalBody.append(imageElement);
    modalBody.append(nameElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typeElement);
    modalBody.append(abilityElement);
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


function search() {
  let searchInput = $('#searchBar').val().toLowerCase();
  let pokemonList = $('.list-group');
  let allPokemon = $('li:has(button)');

  for(let i = 0; i < allPokemon.length; i++) {
    if(allPokemon[i].innerText.toLowerCase().indexOf(searchInput) > -1) {
      allPokemon[i].style.display = '';
    } else {
      allPokemon[i].style.display = 'none';
    }
  }
}
