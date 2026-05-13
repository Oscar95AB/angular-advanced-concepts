import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {

  beforeEach(async () => { // Antes de cada prueba
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App); //  Ecosistema donde conviven los elementos
    const appComponent = fixture.componentInstance; // Instancia del componente
    const compiled = fixture.nativeElement as HTMLElement; // Elemento HTML

    console.log(compiled.innerHTML) // -> te devuelve el html del componente entero
    console.log(compiled.querySelector('a')?.innerHTML) // -> te devuelve el html del componente entero


    expect(appComponent).toBeTruthy();
  });

  // it('should be 4', () => {
  //   // Arrange
  //   const num1 = 1;
  //   const num2 = 2;

  //   // Act
  //   const result = num1+num2;

  //   // Assert
  //   // if(result !== 4){
  //   //   throw new Error('el resultado debe de ser 4')
  //   // }
  //   expect(result).toBe(3); // --> si falla no ejecuta el siguiente
  //   // expect(true).toBe(false);
  // })
  it('should render router-outlet',  () => {
    const fixture = TestBed.createComponent(App); //  Ecosistema donde conviven los elementos
    const compiled = fixture.nativeElement as HTMLElement; // el html
    const routerOutlet  = compiled.querySelector('router-outlet');

    expect(routerOutlet).toBeTruthy();
  });
  it('should render router-outlet with css classes',  () => {
    const fixture = TestBed.createComponent(App); //  Ecosistema donde conviven los elementos
    const compiled = fixture.nativeElement as HTMLElement; // el html

    const divElement = compiled.querySelector('div');
    const mostHaveClasses = 'min-w-screen min-h-screen bg-slate-600 flex items-center justify-center px-5 py-5'.split(' ');
    divElement?.classList.forEach( (className)=> {
      expect(mostHaveClasses).toContain(className);
    })
  });
  it('should render buy me a beer link',  () => {
    const fixture = TestBed.createComponent(App); //  Ecosistema donde conviven los elementos
    const compiled = fixture.nativeElement as HTMLElement; // el html

    const link = compiled.querySelector('a');
    expect(link).toBeTruthy();

    const title = link?.getAttribute('title');
    const href = link?.getAttribute('href');
    const target = link?.getAttribute('target');
    const mostHaveCalsses = 'block w-16 h-16 rounded-full transition-all shadow hover:shadow-lg transform hover:scale-110 hover:rotate-12'.split(' ');
    const classNamesLink = link?.getAttribute('class');
    expect(title).toBe('Buy me a beer');
    expect(href).toBe('https://www.buymeacoffee.com/scottwindon');
    expect(target).toBe('_blank');
    mostHaveCalsses.forEach(className => {
      expect(classNamesLink).toContain(className);

    })

  });
});
