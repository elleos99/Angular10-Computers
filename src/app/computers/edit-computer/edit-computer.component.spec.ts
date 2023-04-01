import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComputerComponent } from './edit-computer.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComputerService } from 'src/app/services/computer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NEVER, of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule } from '@angular/material/icon';
import { Computer } from 'src/app/model/computer.model';

describe('EditComputerComponent', () => {
  let component: EditComputerComponent;
  let fixture: ComponentFixture<EditComputerComponent>;
  let computersrvSpy = jasmine.createSpyObj<ComputerService>(
    'ComputerService',
    ['getComputer', 'changeComputers']
  );
  let activatedRouteSpy = jasmine.createSpyObj<ActivatedRoute>(
    'ActivatedRoute',
    ['params']
  );

  let routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);

  activatedRouteSpy.params = NEVER;

  // beforeEach(async () => {
  beforeEach(async () => {
    spyOn(window, 'alert');

    computersrvSpy = jasmine.createSpyObj<ComputerService>('ComputerService', [
      'getComputer',
      'changeComputers',
    ]);
    await TestBed.configureTestingModule({
      declarations: [EditComputerComponent],
      imports: [
        RouterTestingModule.withRoutes([{ path: 'computers', redirectTo: '' }]),
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatIconModule,
      ],
      providers: [
        { provide: ComputerService, useValue: computersrvSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditComputerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should computer Default exist', () => {
    activatedRouteSpy.params = of({ id: 1 });

    const computer: Computer = {
      id: 1,
      brand: 'Lenovo',
      model: 'H1M1',
    };

    computersrvSpy.getComputer.and.returnValue(of(computer));

    component.formComputer?.patchValue(computer);

    component.computerDefault();

    expect(component.computerDef).toBe(computer);
    expect(component.brandDef).toBe('Lenovo');
    expect(component.modelDef).toBe('H1M1');
    expect(component.formComputer).toBeTruthy();
  });

  it('should computer Default not exist', () => {
    computersrvSpy.getComputer.and.returnValue(
      throwError(() => 'error al obtener la computer default')
    );

    expect(component.computerDefault()).toThrowError;
  });

  it('should change a computer', () => {
    component.formComputer?.setValue({
      brand: 'Lenovo',
      model: 'H1M1',
    });
    computersrvSpy.changeComputers.and.returnValue(of([]));

    component.changeComputer();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/computers']);
  });

  it('should computer Default not exist', () => {
    computersrvSpy.changeComputers.and.returnValue(
      throwError(() => 'error al cambiar la computadora')
    );

    expect(component.changeComputer()).toThrowError;
  });
});
