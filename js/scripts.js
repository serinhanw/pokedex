let pokemonList = [
  { name: 'Ditto', height: 1.00, abilities: ['transform', ' limber'], type: 'normal' },
  { name: 'Raichu', height: 2.07, abilities: 'static', type: ['electric', ' psychic'] },
  { name: 'Smoochum', height: 1.04, abilities: 'clairvoyant', type: ['ice', ' psychic'] },
  { name: 'Jigglypuff', height: 1.08, abilities: ['competitive', ' cutecharm'], types: ['normal', ' fairy'] },
  { name: 'Chikorita', height: 2.11, abilities: 'overgrow', type: 'grass'}
];

for (let i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height > 2) {
    document.write(`<p> ${pokemonList[i].name} (height: ${pokemonList[i].height}) - Call me a giant!</p>`);
  }
  else if (pokemonList[i].height < 2) {
    document.write(`<p> ${pokemonList[i].name} (height: ${pokemonList[i].height})</p>`);
  }
};

document.write('<hr>');

// Question 1: I would like to render the Else statement when the userInput is empty or
// mispelled. However, the Else statment is being rendered for all objects in the pokemonList array.
// What can I do to fix this?
let userInput = 'Ditto';
for (let i = 0; i < pokemonList.length; i++) {
  if (userInput === pokemonList[i].name) {
    document.write(`<p> ${pokemonList[i].name} is a ${pokemonList[i].type} type and has the following power(s): ${pokemonList[i].abilities}. </p>`);
  }
  // else OR else if (userInput !== pokemonList[i].name) {
  //   document.write('<p> Must be one of the following Pokemons listed. </p>');
  // }
};
// OR - Below works however redundant.
// let userInput = ' ';
// if (userInput === pokemonList[0].name) {
//   console.log(`${pokemonList[0].name} has a height of ${pokemonList[0].height} and is the following types(s): ${pokemonList[0].types}.`);
// }
// else if (userInput === pokemonList[1].name) {
//   console.log(`${pokemonList[1].name} has a height of ${pokemonList[1].height} and is the following types(s): ${pokemonList[1].types}.`);
// }
// else if (userInput === pokemonList[2].name) {
//   console.log(`${pokemonList[2].name} has a height of ${pokemonList[2].height} and is the following types(s): ${pokemonList[2].types}.`);
// }
// else if (userInput !== '') {
//   console.log('Must be one of the following Pokemons listed.');
// }
// else {
//   document.write('Let\'s try that again shall we?');
// }

document.write('<hr>');

// Question 2: I noticed in one of the repl exercises the (let text = '').
// What does that do? And is necessary?

// Also, for the following codes, (A) & (B) & (C):
// (A) & (B) should render the names of the Pokemon that fit within the defined
// height parameters. However, when I include the " let text = '' ", both A & B do not cooperate.
// I tried practicing with do/while loop (B) and have it mirror (A); however I am confused.
// How can I make (B) work/better?

// Code (A) :
// let text2 = '';
// for (let i = 0; i < pokemonList.length; i++) {
//   if (pokemonList[i].height > 2) {
//     text2 = text2 + ' ' + pokemonList[i].name;
//   }
//   document.write(text2);
// } // This renders: Raichu Raichu Raichu Raichu Chikorita //It should render Raichu Chikorita
// Code (B) :
let text1 = "";
let i = 0;
do {
text1 = text1 + ' ' + pokemonList[i].name;
i++;
}
while (pokemonList[i].height >= 1 && pokemonList[i].height < 2);
document.write('<p>'+ text1 +'</p>'); // This renders: Ditto //It should render Ditto Smoochum Jigglypuff

document.write('<hr>');

// Code (C) :
// Question 3: When I work with conditionals like below, the code responds well. Why is that so?
document.write('<strong> We\'re the big ones! </strong>');
for (let i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height > 2) {
    document.write('<p>' + pokemonList[i].name + '</p>');
  }
};

document.write('<strong> We\'re the small ones! </strong>');
for (let i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height >= 1 && pokemonList[i].height < 2) {
    document.write('<p>' + pokemonList[i].name + '</p>');
  }
};
