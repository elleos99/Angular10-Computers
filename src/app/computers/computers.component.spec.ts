import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputersComponent } from './computers.component';
import { ComputerService } from '../services/computer.service';
import { MatTable, MatTableModule } from '@angular/material/table';
import { of } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterTestingModule } from '@angular/router/testing';

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
});
