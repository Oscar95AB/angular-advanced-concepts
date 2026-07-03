import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenu } from "../../../shared/components/side-menu/side-menu";

@Component({
  selector: 'app-admin-layout',
  imports: [CommonModule, RouterOutlet, SideMenu],
  templateUrl: './admin-layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export default class AdminLayout {

  isAuthenticated = signal(false);

  onLogin() {
    this.isAuthenticated.set(true);
  }
  onLogout() {
    this.isAuthenticated.set(false);
  }
}
