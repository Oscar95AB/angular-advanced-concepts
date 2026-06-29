import { PokemonService } from './pokemon-service';
import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing'
import { PokeAPIResponse, SimplePokemon } from '../interfaces';
const mockPokeApiResponse: PokeAPIResponse = {
  count: 1302,
  next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
  previous: '',
  results: [
    {
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
    },
    {
      name: 'ivysaur',
      url: 'https://pokeapi.co/api/v2/pokemon/2/',
    },
  ],
};

const expectedPokemons: SimplePokemon[] = [
  { id: '1', name: 'bulbasaur' },
  { id: '2', name: 'ivysaur' },
];

const mockPokemon = {
  id: 1,
  name: 'bulbasaur',
} as any;

describe('PokemonService', () => {

  let service: PokemonService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ provideHttpClientTesting(),]
    }); // Cama de TestBed
    service = TestBed.inject(PokemonService);
    httpMock = TestBed.inject(HttpTestingController);

  })

  afterEach(()=> {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  })


it('should load a page of pokemons', () => {

  service.loadPage(1).subscribe( pokemons => {
    expect(pokemons).toEqual(expectedPokemons)
  });
  // Mockemaos el http
  const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20`)

  expect(req.request.method).toBe('GET');
  req.flush(mockPokeApiResponse);
});

it('should load page 5 of pokemons', () => {
  service.loadPage(5).subscribe( pokemons => {
    expect(pokemons).toEqual(expectedPokemons)
  });
  // Mockemaos el http
  const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon/?offset=80&limit=20`)

  expect(req.request.method).toBe('GET');
  req.flush(mockPokeApiResponse);
});

it('should load a pokemon by ID', () => {
  const pokemonId = '1'
  service.loadPokemon(pokemonId).subscribe( pokemon => {
    expect(pokemon).toEqual(mockPokemon)
  });
  // Mockemaos el http
  const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)

  expect(req.request.method).toBe('GET');
  req.flush(mockPokemon);
});

it('should load a pokemon by Name', () => {
    const pokemonName = 'bulbasaur'
  service.loadPokemon(pokemonName).subscribe( pokemon => {
    expect(pokemon).toEqual(mockPokemon)
  });
  // Mockemaos el http
  const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)

  expect(req.request.method).toBe('GET');
  req.flush(mockPokemon);
});

it('should catch error if API fails', () => {
     const pokemonName = 'bulbasaur'
  service.loadPokemon(pokemonName).subscribe({
    next: () => {
      // Nunca deberia de suceder
      throw new Error('should have failed with 404 error')
    },
    error: (error) => {
      expect(error.status).toBe(404)
      expect(error.statusText).toBe('Not found - Pokemon not found')

    }
  });
  // Mockemaos el http
  const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)

  expect(req.request.method).toBe('GET');
  req.flush('404 error', {status: 404, statusText: 'Not found - Pokemon not found'});
});

})
