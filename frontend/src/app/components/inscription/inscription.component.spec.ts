import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';

import { InscriptionComponent } from './inscription.component';
import { AppService } from '../services/app.service';
import { AuthService } from '../auth/auth.service';
import { AuthComponent } from '../auth/auth.component';

describe('InscriptionComponent', () => {
  let component: InscriptionComponent;
  let fixture: ComponentFixture<InscriptionComponent>;
  let mockAppService: any;
  let mockAuthService: any;
  let mockRouter: any;
  let mockToastr: any;
  let mockAuthComponent: any;

  beforeEach(() => {
    mockAppService = {
      postUsers: jest.fn(),
    };

    mockAuthService = {};
    mockRouter = {
      navigate: jest.fn(),
    };
    mockToastr = {
      success: jest.fn(),
      error: jest.fn(),
    };
    mockAuthComponent = {
      switchToSignIn: jest.fn(), 
    };
    TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule, FormsModule,InscriptionComponent],
      providers: [
        { provide: AppService, useValue: mockAppService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
        { provide: ToastrService, useValue: mockToastr },
        { provide: AuthComponent, useValue: mockAuthComponent },
      ],
    });
    fixture = TestBed.createComponent(InscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call switchToSignIn when switching to sign-in page', () => {
    component.switchToSignIn();
    expect(mockAuthComponent.switchToSignIn).toHaveBeenCalled();
  });


});