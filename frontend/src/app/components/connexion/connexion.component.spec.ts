import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConnexionComponent } from './connexion.component';
import { ToastrService,ToastrModule } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {Router} from '@angular/router';
import { AuthComponent } from '../auth/auth.component';
import {AuthService}  from '../auth/auth.service';
import {AppService} from '../services/app.service';


const authComponentMock = {
  switchToSignUp: jest.fn()
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
  getUsers: jest.fn(() => ({
    subscribe: jest.fn()
  }))
};

const routerMock = {
  navigate: jest.fn()
};

describe('ConnexionComponent', () => {
  let component: ConnexionComponent;
  let fixture: ComponentFixture<ConnexionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, ToastrModule.forRoot()],
      providers: [
        FormBuilder,  // Fournir FormBuilder
        { provide: AuthComponent, useValue: authComponentMock },  // Fournir AuthComponent mock
        { provide: AuthService, useValue: authServiceMock },  // Fournir AuthService mock
        { provide: AppService, useValue: appServiceMock },  // Fournir AppService mock
        { provide: Router, useValue: routerMock },  // Fournir Router mock
        { provide: ToastrService, useValue: toastrServiceMock },  // Fournir ToastrService mock
      ]
    });

    fixture = TestBed.createComponent(ConnexionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call switchToSignUp', () => {
    component.switchToSignUp();
    expect(authComponentMock.switchToSignUp).toHaveBeenCalled();
  });
});
