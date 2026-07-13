import { RouterLink, RouterLinkActive } from '@angular/router';
import { Component, input, output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';


export enum TitleColor  {
  red = 'text-red-500',
  blue = 'text-blue-500',
  purple = 'text-purple-500',
  green = 'text-green-500'
}

@Component({
  selector: 'lib-apx-side-menu',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: 'apx-side-menu.html',
  styles: ``,
  encapsulation: ViewEncapsulation.None
})
export class ApxSideMenu {

  isAuthenticated = input(false);

  titleColor = input<TitleColor>(TitleColor.purple);
  SignOut = output();
  SignIn = output();
}
