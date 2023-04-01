import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComputerComponent } from './edit-computer.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComputerService } from 'src/app/services/computer.service';
import { ActivatedRoute } from '@angular/router';
import { NEVER, Subject } from 'rxjs';

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
  activatedRouteSpy.params = NEVER;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditComputerComponent],
      imports: [
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: ComputerService, useValue: computersrvSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditComputerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
