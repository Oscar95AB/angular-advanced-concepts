import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'pokemon-list-skeleton',
  imports: [],
  templateUrl: './pokemon-list-skeleton.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonListSkeleton implements OnInit {
  ngOnInit(): void {}
}
