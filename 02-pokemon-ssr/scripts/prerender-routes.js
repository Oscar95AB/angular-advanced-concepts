const TOTAL_POKEMON = 151;
const TOTAL_PAGES = 5;

(async ()=> {

  const fs = require('fs');
  // POKEMONS POR IDS
  const pokemonsIds = Array.from({length: TOTAL_POKEMON}, (_, i) => i + 1);
  let fileContent = pokemonsIds.map(
    id => `/pokemons/${id}`
  ).join('\n')
  console.log('pokemon/:id created')


  // PAGINAS POKEMONS
  for(let index = 1; index <= TOTAL_PAGES; index++){
    fileContent +=  `\n/pokemons/page/${index}`
  }
  console.log('pokemons/page/:id created')


  // PAGINAS POR NOMBRES DE POKEMONS
  const pokemonNameList = await  fetch(`https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_POKEMON}`)
  .then( res => res.json())

  fileContent += '\n';
  fileContent += pokemonNameList.results.map( pokemon => `/pokemons/${pokemon.name}`).join('\n')
  console.log('pokemons/:name created')



  fs.writeFileSync('routes.txt', fileContent);
  console.log('routes.txt generated')

})();
