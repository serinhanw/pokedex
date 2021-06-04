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
    if (typeof pokemon === 'object') {
    pokemonList.push(pokemon);
    }
    else  {
      console.log('Must include ' + Object.keys(pokemonList[0]) + '.');
    }
  }

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll,
  };

})();

pokemonRepository.getAll();
console.log(pokemonRepository.getAll());

function pokeDes() {
pokemonRepository.getAll().forEach(function(pokemon) {
  document.write('<p>' + pokemon.name + ' is a ' + pokemon.type + ' type and has the following abilities: ' + pokemon.abilities + '.' + '</p>');
});
}

pokemonRepository.add('Lillipup');
console.log(pokemonRepository.getAll());
pokemonRepository.add({ name: 'Lillipup', height: 1.04, abilities: ['vital spirit', ' pickup'], type: 'normal' });
console.log(pokemonRepository.getAll());


pokeDes();


document.write('<hr>');
