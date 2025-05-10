import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InscriptionComponent } from './inscription.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../services/app.service';
import { AuthService } from '../auth/auth.service';
import { AuthComponent } from '../auth/auth.component';
import { of, throwError } from 'rxjs';

describe('InscriptionComponent', () => {
  let component: InscriptionComponent;
  let fixture: ComponentFixture<InscriptionComponent>;
  let toastrMock: any;
  let routerMock: any;
  let appServiceMock: any;
  let authComponentMock: any;

  beforeEach(async () => {
    toastrMock = {
      success: jest.fn(),
      error: jest.fn(),
    };

    routerMock = {
      navigate: jest.fn(),
    };

    appServiceMock = {
      postUsers: jest.fn(),
    };

    authComponentMock = {
      switchToSignIn: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, InscriptionComponent],
      providers: [
        FormBuilder,
        { provide: Router, useValue: routerMock },
        { provide: ToastrService, useValue: toastrMock },
        { provide: AppService, useValue: appServiceMock },
        { provide: AuthService, useValue: {} },
        { provide: AuthComponent, useValue: authComponentMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InscriptionComponent);
    component = fixture.componentInstance;
    component.ngOnInit(); 
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    expect(component.userForm).toBeTruthy();
    expect(component.userForm.controls['nom']).toBeTruthy();
  });

  it('should show error if form is invalid', () => {
    component.userForm.setValue({
      nom: '',
      email: '',
      role: '',
      password: '',
      repassword: ''
    });

    component.sInscrire();
    expect(toastrMock.error).toHaveBeenCalledWith('Veillez remplir tous les champs');
  });

  it('should show error if passwords do not match', () => {
    component.userForm.setValue({
      nom: 'John',
      email: 'john@example.com',
      role: 'Membre',
      password: '1234',
      repassword: '5678'
    });

    component.sInscrire();
    expect(toastrMock.error).toHaveBeenCalledWith('Les mots de passes saisis ne sont pas indentiques');
  });
  it('should handle error when postUsers fails', () => {
    const formValue = {
      nom: 'Jane',
      email: 'jane@example.com',
      role: 'Observateur',
      password: 'pass123',
      repassword: 'pass123'
    };
    appServiceMock.postUsers.mockReturnValue(throwError(() => new Error('Erreur réseau')));
    component.userForm.setValue(formValue);
    component.sInscrire();
    expect(toastrMock.success).not.toHaveBeenCalled();
  });
});
