import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApxSideMenu } from './apx-side-menu';
import { provideRouter } from '@angular/router';

import { vi } from 'vitest';



describe('ApxSideMenu', () => {
  let component: ApxSideMenu;
  let fixture: ComponentFixture<ApxSideMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApxSideMenu],
      providers: [ provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ApxSideMenu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('shoud call SignIn when logout button u clicked', ()=> {
    vi.spyOn(component.SignIn, 'emit');
    fixture.componentRef.setInput('isAuthenticated', false)
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('[data-login]') as HTMLButtonElement;
    expect(button).toBeTruthy();
      button.click();

      expect(component.SignIn.emit).toHaveBeenCalled();
    // spyOn(component.SignOut, 'emit')
  })
  it('shoud call SignOut when logout button u clicked', ()=> {
    vi.spyOn(component.SignOut, 'emit');
    fixture.componentRef.setInput('isAuthenticated', true)
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('[data-logout]') as HTMLButtonElement;
    expect(button).toBeTruthy();
      button.click();

      expect(component.SignOut.emit).toHaveBeenCalled();
    // spyOn(component.SignOut, 'emit')
  })
});
