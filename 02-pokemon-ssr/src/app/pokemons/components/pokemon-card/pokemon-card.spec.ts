import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonCard } from './pokemon-card';
import { provideRouter, RouterLink } from '@angular/router';
import { SimplePokemon } from '../../interfaces';
import { By } from '@angular/platform-browser';


const mockPokemon: SimplePokemon = {
  id: '1',
  name: 'bulbasaur'
}

describe('PokemonCard', () => {

  let component : PokemonCard
  let fixture: ComponentFixture<PokemonCard>

  beforeEach(()=> {
    TestBed.configureTestingModule({
      imports: [PokemonCard],
      providers:[provideRouter([])]
    })

    fixture = TestBed.createComponent(PokemonCard)
    component = fixture.componentInstance;

    // valores inputs
    fixture.componentRef.setInput('pokemon', mockPokemon);

    fixture.detectChanges();
  })

  it('should create', () => {

    expect(component).toBeTruthy();
  })

  it('should have SimplePokemon signal input', () => {
    expect(component.pokemon()).toStrictEqual(mockPokemon)
  })
  it('should compute the correct pokemon image URL', () => {
    const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${mockPokemon.id}.png`;

    //Computed
    expect(component.pokemonImage()).toBe(imgUrl);

    const imgProcces = (fixture.nativeElement as HTMLElement).querySelector('img')?.getAttribute('src');


    // Procesamos la url para eliminar el numero
    expect(imgUrl).toBe(imgProcces)
    // console.log('que hau',(fixture.nativeElement as HTMLElement).querySelector);
  })

  it('should render pokemon name and image correctly', ()=> {
    const compiled =  (fixture.nativeElement as HTMLElement);
    const nameElement = compiled.querySelector('h2');
    const imgElement = compiled.querySelector('img');

    expect(nameElement?.textContent.trim()).toBe(mockPokemon.name);

    expect(imgElement?.src).toBe(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${mockPokemon.id}.png`)
    expect(imgElement?.alt).toBe(mockPokemon.name)

  })

  it('should have the correct routeLink configuration', () => {
    // Como es una directiva y no se encuentra en el HTML que genera, tenemos que mirar en el propio de Angular
    // de ahí el debugElement
    const debugElement = fixture.debugElement.query(
      By.directive(RouterLink)
    );
    const routerLinkInstance = debugElement.injector.get(RouterLink); // Aqui lo cogemos directamente del injector
    const expectedUrl = `/pokemon/${mockPokemon.name}`
    expect(routerLinkInstance.urlTree?.toString()).toBe(expectedUrl)
  })
})
