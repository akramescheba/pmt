import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

describe('AuthService', () => {
  let service: AuthService;
  let toastrMock: any;
  let routerMock: any;

  beforeEach(() => {
    toastrMock = { success: jest.fn() };
    routerMock = { navigate: jest.fn() };

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: ToastrService, useValue: toastrMock },
        { provide: Router, useValue: routerMock }
      ]
    });

    service = TestBed.inject(AuthService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set token on logIn', () => {
    service.logIn();
    expect(localStorage.getItem('token')).toBe('loggedIn');
  });

  it('should remove token and navigate to /login on logOut', () => {
    localStorage.setItem('token', 'testToken');
    service.logOut();
    expect(localStorage.getItem('token')).toBeNull();
    expect(toastrMock.success).toHaveBeenCalledWith('Vous êtes déconnecté');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should get nom from localStorage', () => {
    localStorage.setItem('nom', 'Jean');
    expect(service.getNom()).toBe('Jean');
  });

  it('should get role from localStorage', () => {
    localStorage.setItem('role', 'admin');
    expect(service.getRole()).toBe('admin');
  });

  it('should toggle isSignUp when switchToSignIn is called', () => {
    const initial = service.isSignUp;
    service.switchToSignIn();
    expect(service.isSignUp).toBe(!initial);
  });

  it('should toggle isSignUp when switchToSignUp is called', () => {
    const initial = service.isSignUp;
    service.switchToSignUp();
    expect(service.isSignUp).toBe(!initial);
  });
});
