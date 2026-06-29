import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideRouter } from '@angular/router';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Navbar } from './shared/components/navbar/navbar';

@Component({
  selector: 'app-navbar',
  template: `
  <nav class="test-class">
      <a href="test-link">Test Link</a>
  </nav>
  `
})
class MockNavbarComponent{}

describe('App', () => {

  let fixture : ComponentFixture<App>;
  let app: App;

  beforeEach(async () => {
    // !1
    // await TestBed.configureTestingModule({
    //   imports: [App],
    //   providers: [provideRouter([])], // Router real
    // }).compileComponents();
    // !2
    // await TestBed.configureTestingModule({
    //   imports: [App],
    //   providers: [provideRouter([])], // Router real
    // })
    // .overrideComponent(App, {
    //   add: {
    //     imports: [MockNavbarComponent]
    //   },
    //   remove: {
    //     imports: [Navbar]
    //   }
    // })
    // .compileComponents();
    // !3
    //
    TestBed.overrideComponent(App, {
    set: {
      imports: [MockNavbarComponent], // Falta el router y todo lo que dependa... se puede importar
      schemas: [CUSTOM_ELEMENTS_SCHEMA] // Con esto quitamos los mensajes en consola pero puede dar un falso psoitivo
    }
    })

    fixture = TestBed.createComponent(App);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    // const fixture = TestBed.createComponent(App);
    // const app = fixture.componentInstance;


    console.log(fixture.nativeElement.innerHTML);

    expect(app).toBeTruthy();
  });

  it('should render the navbar and router-outlet', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('app-navbar')).toBeTruthy();
    expect(compiled.querySelector('router-outlet')).toBeTruthy();

  })

  it('should match snpashot', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.innerHTML).toMatchSnapshot();

  })

  // it('should render title', async () => {
  //   const fixture = TestBed.createComponent(App);
  //   await fixture.whenStable();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('h1')?.textContent).toContain('Hello, pokemon-ssr');
  // });
});
