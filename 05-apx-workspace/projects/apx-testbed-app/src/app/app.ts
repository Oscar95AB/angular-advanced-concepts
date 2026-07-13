
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ApxSideMenu, TitleColor} from 'apx-side-menu'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ApxSideMenu],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('apx-testbed-app');
  TitleColor = TitleColor
  isAuthenticated = signal(true);
}
