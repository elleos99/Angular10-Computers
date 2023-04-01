import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewComputerComponent } from './new-computer.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { ComputerService } from 'src/app/services/computer.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Computer } from 'src/app/model/computer.model';
import { RouterTestingModule } from '@angular/router/testing';

describe('NewComputerComponent', () => {
  let component: NewComputerComponent;
  let fixture: ComponentFixture<NewComputerComponent>;
  let computersrvSpy = jasmine.createSpyObj<ComputerService>(
    'ComputerService',
    ['saveComputers']
  );

  let routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewComputerComponent],
      imports: [
        RouterTestingModule.withRoutes([{ path: 'computers', redirectTo: '' }]),
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: ComputerService, useValue: computersrvSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NewComputerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save Computer', () => {
    component.formComputer?.setValue({
      brand: 'Lenovo',
      model: 'H1M1',
    });
    computersrvSpy.saveComputers.and.returnValue(of([]));

    component.saveComputer();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/computers']);
  });

  it('should saveComputer error', () => {
    computersrvSpy.saveComputers.and.returnValue(
      throwError(() => 'error al guardar')
    );

    expect(component.saveComputer()).toThrowError;
  });
});
