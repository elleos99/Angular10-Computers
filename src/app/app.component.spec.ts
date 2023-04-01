import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UtilService } from './services/util.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Component } from '@angular/core';

@Component({
  selector: 'login',
  template: '<span>login</span>',
})
class MockLoginComponent {}

describe('AppComponent', () => {
  let routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);
  let utilsrvSpy = jasmine.createSpyObj<UtilService>('UtilService', [
    'getToken',
    'deleteToken',
    'isLogged',
  ]);

  utilsrvSpy.isLogged = new Subject<boolean>();
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'login',
            component: MockLoginComponent,
          },
        ]),
        MatToolbarModule,
      ],
      declarations: [AppComponent],
      providers: [
        {
          provide: Router,
          useValue: routerSpy,
        },
        {
          provide: UtilService,
          useValue: utilsrvSpy,
        },
      ],
    }).compileComponents();
    router = TestBed.inject(Router);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-2023'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular-2023');
  });

  it(`should create an app whit user logged in`, () => {
    utilsrvSpy.getToken.and.returnValue('Token');

    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.isLogged).toBe(true);
  });

  it(`should create app with user is not logged in`, () => {
    utilsrvSpy.getToken.and.returnValues(null);
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.isLogged).toBe(false);
  });

  it(`should recieve isLogged from UtilSvc true`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    utilsrvSpy.isLogged.next(true);
    expect(app.isLogged).toBeTrue();
  });

  it(`should recieve isLogged from UtilSvc false`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    utilsrvSpy.isLogged.next(false);
    expect(app.isLogged).toBeFalse();
  });

  it('should logout', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.logout();
    expect(utilsrvSpy.deleteToken).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledOnceWith(['login']);
  });
});
