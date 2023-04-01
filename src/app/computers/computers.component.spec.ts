import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputersComponent } from './computers.component';
import { ComputerService } from '../services/computer.service';
import { MatTable, MatTableModule } from '@angular/material/table';
import { of, throwError } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterTestingModule } from '@angular/router/testing';
import { Computer } from '../model/computer.model';

describe('ComputersComponent', () => {
  let component: ComputersComponent;
  let fixture: ComponentFixture<ComputersComponent>;
  let computersrvSpy = jasmine.createSpyObj<ComputerService>(
    'ComputerService',
    ['getComputers', 'deleteComputers']
  );

  computersrvSpy.getComputers.and.returnValue(of([]));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComputersComponent],
      imports: [
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        RouterTestingModule,
      ],
      providers: [{ provide: ComputerService, useValue: computersrvSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(ComputersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should loadData ok`, () => {
    const mockResponse: Computer[] = [
      {
        id: 1,
        brand: 'Lenovo',
        model: 'H1M1',
      },
      {
        brand: 'HP',
        model: 'Pavilion',
        id: 2,
      },
    ];

    computersrvSpy.getComputers.and.returnValue(of(mockResponse));

    component.loadData();

    expect(component.computers.data.length).toBe(2);
  });

  it(`should loadData error`, () => {
    const mockResponseEmpty: Computer[] = [];
    computersrvSpy.getComputers.and.returnValue(of(mockResponseEmpty));
    component.loadData();

    expect(component.computers.data.length).toBe(0);

    computersrvSpy.getComputers.and.returnValue(
      throwError(() => 'error, list is empty')
    );
  });

  it('should deleteComputer ok', () => {
    const mockResponse: Computer[] = [
      {
        id: 1,
        brand: 'Lenovo',
        model: 'H1M1',
      },
      {
        brand: 'HP',
        model: 'Pavilion',
        id: 2,
      },
    ];

    computersrvSpy.getComputers.and.returnValue(of(mockResponse));

    component.loadData();

    const computer: Computer = {
      id: 1,
      brand: 'Lenovo',
      model: 'H1M1',
    };

    mockResponse.shift();
    computersrvSpy.deleteComputers.and.returnValue(of(mockResponse));

    component.deleteComputer(computer);

    expect(component.computers.data.length).toBe(1);
  });

  it('should deleteComputer error', () => {
    const mockResponse: Computer[] = [
      {
        id: 1,
        brand: 'Lenovo',
        model: 'H1M1',
      },
      {
        brand: 'HP',
        model: 'Pavilion',
        id: 2,
      },
    ];

    computersrvSpy.getComputers.and.returnValue(of(mockResponse));

    component.loadData();

    const computer: Computer = {
      id: 1,
      brand: 'Lenovo',
      model: 'H1M1',
    };

    computersrvSpy.deleteComputers.and.returnValue(
      throwError(() => 'error deleting')
    );

    component.deleteComputer(computer);

    expect(component.computers.data.length).toBe(2);
  });
});
