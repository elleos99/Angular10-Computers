import { TestBed, inject } from '@angular/core/testing';

import { ComputerService } from './computer.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Observable } from 'rxjs';
import { Computer } from '../model/computer.model';

describe('ComputerService', () => {
  let service: ComputerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ComputerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // ------------------- Para getComputers -------------------
  it('should http getComputers ok', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const obs = service.getComputers();

      expect(obs instanceof Observable).toBeTrue();

      obs.subscribe({
        next: (val) => {
          expect(val).toBeDefined();
          expect(val.length).toBe(1);
          const first = val[0];
          expect(first.id).toBe(1);
          expect(first.brand).toBe('Lenovo');
          expect(first.model).toBe('H1M1');
        },
      });

      const request = httpMock.expectOne('http://localhost:7000/computers');
      expect(request.request.method).toBe('GET');

      request.flush([
        {
          id: 1,
          brand: 'Lenovo',
          model: 'H1M1',
        },
      ]);
    }
  ));

  it('should http getComputers error', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const obs = service.getComputers();

      expect(obs instanceof Observable).toBeTrue();

      obs.subscribe({
        error: (err) => {
          expect(err.error.type).toBe('computers not found');
        },
      });

      const request = httpMock.expectOne('http://localhost:7000/computers');
      expect(request.request.method).toBe('GET');

      request.error(new ErrorEvent('computers not found'));
    }
  ));

  // ------------------- Para saveComputers -------------------

  it('should http saveComputers ok', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const compu = {
        brand: 'Lenovo',
        model: 'H1M1',
      } as Computer;

      const obs = service.saveComputers(compu);

      expect(obs instanceof Observable).toBeTrue();

      obs.subscribe({
        next: (val) => {
          expect(val).toBeDefined();
        },
      });

      const request = httpMock.expectOne('http://localhost:7000/computers');
      expect(request.request.method).toBe('POST');
      expect(request.request.body).toBe(compu);

      request.flush([{}]);
    }
  ));

  it('should http saveComputers error', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const compu = {
        brand: 'Lenovo',
        model: 'H1M1',
      } as Computer;

      const obs = service.saveComputers(compu);

      expect(obs instanceof Observable).toBeTrue();

      obs.subscribe({
        error: (err) => {
          expect(err.error.type).toBe('error saving computers');
        },
      });

      const request = httpMock.expectOne('http://localhost:7000/computers');
      expect(request.request.method).toBe('POST');
      expect(request.request.body).toBe(compu);

      request.error(new ErrorEvent('error saving computers'));
    }
  ));

  // ------------------- Para deleteComputers -------------------

  it('should http deleteComputers ok', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const ID = 1;

      const obs = service.deleteComputers(ID);

      expect(obs instanceof Observable).toBeTrue();

      obs.subscribe({
        next: (val) => {
          expect(val).toBeDefined();
        },
      });

      const request = httpMock.expectOne('http://localhost:7000/computers/1');
      expect(request.request.method).toBe('DELETE');

      request.flush([
        {
          id: 1,
          brand: 'Lenovo',
          model: 'H1M1',
        },
      ]);
    }
  ));

  it('should http deleteComputers error', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const ID = 1;

      const obs = service.deleteComputers(ID);

      expect(obs instanceof Observable).toBeTrue();

      obs.subscribe({
        error: (err) => {
          expect(err.error.type).toBe('error deleting computers');
        },
      });

      const request = httpMock.expectOne('http://localhost:7000/computers/1');
      expect(request.request.method).toBe('DELETE');

      request.error(new ErrorEvent('error deleting computers'));
    }
  ));

  // ------------------- Para changeComputers -------------------

  it('should http putComputers ok', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const compu = {
        id: 1,
        brand: 'Lenovo',
        model: 'H2M2',
      } as Computer;

      const obs = service.changeComputers(compu, compu.id);

      expect(obs instanceof Observable).toBeTrue();

      obs.subscribe({
        next: (val) => {
          expect(val).toBeDefined();
        },
      });

      const request = httpMock.expectOne('http://localhost:7000/computers/1');
      expect(request.request.method).toBe('PUT');
      expect(request.request.body).toBe(compu, compu.id);

      request.flush([
        {
          id: 1,
          brand: 'Lenovo',
          model: 'H1M1',
        },
      ]);
    }
  ));

  it('should http putComputers error', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const compu = {
        id: 1,
        brand: 'Lenovo',
        model: 'H1M1',
      } as Computer;

      const obs = service.changeComputers(compu, compu.id);

      expect(obs instanceof Observable).toBeTrue();

      obs.subscribe({
        error: (err) => {
          expect(err.error.type).toBe('error changing computers');
        },
      });

      const request = httpMock.expectOne('http://localhost:7000/computers/1');
      expect(request.request.method).toBe('PUT');
      expect(request.request.body).toBe(compu, compu.id);

      request.error(new ErrorEvent('error changing computers'));
    }
  ));

  // ------------------- Para getComputer -------------------
  it('should http getComputer ok', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const ID = 1;
      const obs = service.getComputer(ID);

      expect(obs instanceof Observable).toBeTrue();

      obs.subscribe({
        next: (val) => {
          expect(val).toBeDefined();
        },
      });

      const request = httpMock.expectOne('http://localhost:7000/computers/1');
      expect(request.request.method).toBe('GET');

      request.flush([
        {
          id: 1,
          brand: 'Lenovo',
          model: 'H1M1',
        },
      ]);
    }
  ));

  it('should http getComputer error', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const ID = 1;
      const obs = service.getComputer(ID);

      obs.subscribe({
        error: (err) => {
          expect(err.error.type).toBe('computer not found');
        },
      });

      const request = httpMock.expectOne('http://localhost:7000/computers/1');
      expect(request.request.method).toBe('GET');

      request.error(new ErrorEvent('computer not found'));
    }
  ));
});
