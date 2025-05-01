import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ConnexionComponent } from './connexion.component';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
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


});
