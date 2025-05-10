import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConnexionComponent } from './connexion.component';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthComponent } from '../auth/auth.component';
import { AuthService } from '../auth/auth.service';
import { AppService } from '../services/app.service';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

const fakeUsers = [
  {
    id: 1,
    nom: 'John Doe',
    email: 'admin',
    password: 'admin',
    role: 'Administrateur',
  },
];

const authComponentMock = {
  switchToSignUp: jest.fn(),
};

const toastrServiceMock = {
  success: jest.fn(),
  info: jest.fn(),
  warning: jest.fn(),
  error: jest.fn(),
};

const authServiceMock = {
  logIn: jest.fn(),
};

const appServiceMock = {
  getUsers: jest.fn(() => of(fakeUsers)),
};

const routerMock = {
  navigate: jest.fn(),
};

describe('ConnexionComponent', () => {
  let component: ConnexionComponent;
  let fixture: ComponentFixture<ConnexionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        HttpClientModule,
      ],
      providers: [
        FormBuilder,
        { provide: AuthComponent, useValue: authComponentMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: AppService, useValue: appServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ToastrService, useValue: toastrServiceMock },
      ]
    });

    fixture = TestBed.createComponent(ConnexionComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call switchToSignUp', () => {
    component.switchToSignUp();
    expect(authComponentMock.switchToSignUp).toHaveBeenCalled();
  });

  it('should initialize loginForm with email and psw controls on ngOnInit', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.contains('email')).toBeTruthy();
    expect(component.loginForm.contains('psw')).toBeTruthy();
  });

  it('should set email control as required and validate email format', () => {
    const control = component.loginForm.get('email');
    expect(control?.validator).not.toBeNull();
    expect(control?.hasValidator(Validators.required)).toBeTruthy();
    expect(control?.hasValidator(Validators.email)).toBeTruthy();
  });

  it('should set psw control as required', () => {
    const control = component.loginForm.get('psw');
    expect(control?.validator).not.toBeNull();
    expect(control?.hasValidator(Validators.required)).toBeTruthy();
  });

  it('should show warning if form is invalid', () => {
    component.loginForm.setValue({ email: '', psw: '' });
    component.seConnecter();
    expect(toastrServiceMock.warning).toHaveBeenCalledWith('Veuillez remplir tous les champs.');
  });
});
