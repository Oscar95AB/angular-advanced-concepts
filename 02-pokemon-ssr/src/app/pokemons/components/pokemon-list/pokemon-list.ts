import { ChangeDetectionStrategy, Component, input, type OnInit } from '@angular/core';
import { PokemonCard } from "../pokemon-card/pokemon-card";
import { SimplePokemon } from '../../interfaces';

@Component({
  selector: 'pokemon-list',
  imports: [PokemonCard],
  standalone: true,
  templateUrl: './pokemon-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonList  {

  public pokemons = input.required<SimplePokemon[]>();
}
