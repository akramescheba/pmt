import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router } from '@angular/router';
import { useRoleGuard } from './use-role.guard';
import { ToastrService } from 'ngx-toastr';

describe('useRoleGuard', () => {
  let routerMock: any;
  let toastrMock: any;

  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => useRoleGuard(...guardParameters));

  beforeEach(() => {
    routerMock = {
      navigate: jest.fn()
    };

    toastrMock = {
      info: jest.fn(),
      error: jest.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: ToastrService, useValue: toastrMock }
      ]
    });

    localStorage.clear();
    jest.clearAllMocks();
  });
  
  it('should be defined', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should allow access when user role is authorized', () => {
    localStorage.setItem('role', 'admin');

    const result = executeGuard(
      { data: { roles: ['admin', 'user'] } } as any,
      {} as any
    );

    expect(result).toBe(true);
    expect(toastrMock.info).toHaveBeenCalledWith('Vous êtes connecté en tant que admin');
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  it('should deny access when user role is not authorized', () => {
    localStorage.setItem('role', 'guest');

    const result = executeGuard(
      { data: { roles: ['admin', 'user'] } } as any,
      {} as any
    );

    expect(result).toBe(false);
    expect(toastrMock.error).toHaveBeenCalledWith("Vous n'avez pas les droits d'accès à cette page");
  });

  it('should deny access when no role is present', () => {
    const result = executeGuard(
      { data: { roles: ['admin'] } } as any,
      {} as any
    );

    expect(result).toBe(false);
    expect(toastrMock.error).toHaveBeenCalledWith("Vous n'avez pas les droits d'accès à cette page");

  });
});
