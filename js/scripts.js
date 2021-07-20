let pokemonRepository = (function (){

  let pokemonList = [
    { name: 'Ditto', height: 1.00, abilities: ['transform', ' limber'], type: 'normal' },
    { name: 'Raichu', height: 2.07, abilities: 'static', type: ['electric', ' psychic'] },
    { name: 'Smoochum', height: 1.04, abilities: 'clairvoyant', type: ['ice', ' psychic'] },
    { name: 'Jigglypuff', height: 1.08, abilities: ['competitive', ' cutecharm'], types: ['normal', ' fairy'] },
    { name: 'Chikorita', height: 2.11, abilities: 'overgrow', type: 'grass'},
    { name: 'Mew', height: 1.04, abilities: 'synchronize', type: 'psychic' },
    { name: 'Celebi', height: 2.00, abilities: 'natural cure', type: ['psychic', ' grass'] },
    { name: 'Jirachi', height: 1.00, abilities: 'serene grace', type: ['steel', ' psychic'] },
    { name: 'Meloetta', height: 2.00, abilities: 'serene grace', types: ['normal', ' psychic'] },
    { name: 'Meltan', height: 0.08, abilities: 'magnet pull', type: 'steel'}
  ];

  function add(pokemon) {
    if (typeof pokemon === 'object' && 'name' in pokemon && 'height' in pokemon && 'abilities' in pokemon && 'type' in pokemon) {
    pokemonList.push(pokemon);
    }
    else  {
      console.log('Must include ' + Object.keys(pokemonList[0]) + '.');
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
    console.log(pokemon);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
  };

})();


console.log(pokemonRepository.getAll());




pokemonRepository.add('Lillipup');
pokemonRepository.add({ name: 'Lillipup', height: 1.04, abilities: ['vital spirit', ' pickup'], type: 'normal' });
console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});



// document.write('<hr>');
