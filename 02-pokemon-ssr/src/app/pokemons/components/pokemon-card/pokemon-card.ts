import { SimplePokemon } from './../../interfaces/simple-pokemon.interface';
import { ChangeDetectionStrategy, Component, computed, effect, input, type OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'pokemon-card',
  imports: [RouterLink],
  templateUrl: './pokemon-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonCard implements OnInit {
  public pokemon = input.required<SimplePokemon>();
  public readonly pokemonImage = computed(()=>{
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.pokemon().id}.png`
  })
  // logEffect = effect(()=> {
  //   console.log('efecto', this.pokemon())
  // })

  ngOnInit(): void {}
}
