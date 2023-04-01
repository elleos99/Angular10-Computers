import { TestBed } from '@angular/core/testing';

import { UtilService } from './util.service';

describe('UtilService', () => {
  let service: UtilService;

  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem');
    spyOn(localStorage, 'removeItem');

    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save Token', () => {
    service.isLogged.subscribe({
      next: (val) => {
        expect(val).toBeTrue();
      },
    });
    service.saveToken('Token1234');
    expect(localStorage.setItem).toHaveBeenCalledWith('Token', 'Token1234');
  });

  it('should get Token', () => {
    service.getToken();
    expect(localStorage.getItem).toHaveBeenCalledWith('Token');
  });

  it('should delete Token', () => {
    service.isLogged.subscribe({
      next: (val) => {
        expect(val).toBeFalse();
      },
    });
    service.deleteToken();
    expect(localStorage.removeItem).toHaveBeenCalledWith('Token');
  });
});
