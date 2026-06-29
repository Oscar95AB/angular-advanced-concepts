import { provideRouter } from '@angular/router';
import { SimplePokemon } from '../../interfaces';
import { PokemonList } from './pokemon-list';
import { ComponentFixture, TestBed } from '@angular/core/testing';

const mockPokemon: SimplePokemon[] = [
  {id:'1', name: 'bulbasaur'},
  {id:'2', name: 'ivysaur'}
]

describe('PokemonList', () => {

  let component : PokemonList
  let fixture: ComponentFixture<PokemonList>

  beforeEach(()=> {
    TestBed.configureTestingModule({
      imports: [PokemonList],
      providers: [provideRouter([])]
    })

    fixture = TestBed.createComponent(PokemonList)
    component = fixture.componentInstance;
    fixture.componentRef.setInput('pokemons', mockPokemon);
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  })

  it('should input works correctly', () => {
    expect(component.pokemons().length).toBe(2);
    expect(component.pokemons()).toBe(mockPokemon);
  })

  it('should render the pokemon list', () => {
    const listPokemonCard = (fixture.nativeElement as HTMLElement).querySelectorAll('pokemon-card');
    const cantidad = listPokemonCard.length;
    expect(cantidad).toBe(mockPokemon.length);
  })

  it('should render "No hay pokemons" when list is empty', ()=>{
    fixture.componentRef.setInput('pokemons', []);
    fixture.detectChanges();
    const compiled = (fixture.nativeElement as HTMLElement);
    const message = compiled.querySelector('div.col-span-5');
    expect(message?.textContent).toContain('No hay pokemon')
  })
})
