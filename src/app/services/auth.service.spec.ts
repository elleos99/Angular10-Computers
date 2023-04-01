import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth.service';
import { UtilService } from './util.service';
import { Router } from '@angular/router';

describe('AuthService', () => {
  let service: AuthService;
  let utilsrvSpy = jasmine.createSpyObj<UtilService>('UtilService', [
    'getToken',
  ]);
  let routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'login',
            redirectTo: '',
          },
        ]),
      ],
      providers: [
        { provide: UtilService, useValue: utilsrvSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should canActivate user logged in', () => {
    utilsrvSpy.getToken.and.returnValue('Token');
    const res = service.canActivate();
    expect(res).toBeTrue();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should canActivate user not logged in', () => {
    utilsrvSpy.getToken.and.returnValue(null);
    const res = service.canActivate();
    expect(res).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['login']);
  });
});
