import { PokemonService } from './../../pokemons/services/pokemon-service';
import { ApplicationRef, ChangeDetectionStrategy, Component, inject, OnDestroy, signal, type OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop'
import { PokemonList } from "../../pokemons/components/pokemon-list/pokemon-list";
import { PokemonListSkeleton } from './ui/pokemon-list-skeleton/pokemon-list-skeleton';
import { SimplePokemon } from '../../pokemons/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pokemon-page',
  imports: [PokemonListSkeleton, PokemonList],
  standalone: true,
  templateUrl: './pokemon-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonPage implements OnInit, OnDestroy {

  public isLoading = signal(true);

  public currentName = signal('Oscar');

  public pokemonService  = inject(PokemonService);

  public pokemons = signal<SimplePokemon[]>([])

  private route = inject(ActivatedRoute);
  private router = inject(Router)

  private title = inject(Title)

  public currentPage = toSignal(this.route.queryParamMap.pipe(
    map (params => params.get('page') ?? '1'),
    map( page => (isNaN(+page) ? 1 : +page)),
    map( page => Math.max(1,page))
  ))

  // private appRef = inject(ApplicationRef);

  // private $appState = this.appRef.isStable.subscribe( isStable => {
  //   console.log(isStable)
  // })

  ngOnInit(): void {
    console.log(this.currentPage())
    this.loadPokemons();
    setTimeout(()=> {
      this.isLoading.set(false);

    }, 5000)
  }
  ngOnDestroy(): void {
    // this.$appState.unsubscribe();
  }

  public loadPokemons(page = 0) {
    const pageToLoad = this.currentPage()! + page
    this.pokemonService.loadPage(pageToLoad).pipe(
      tap(() =>
        this.router.navigate([], {queryParams:{page: pageToLoad}}
        )),
      tap(()=> { this.title.setTitle(`Pokemons SSR - Page ${pageToLoad}`)})
    ).subscribe(pokemons => {
      this.pokemons.set(pokemons)
    })
  }
}
