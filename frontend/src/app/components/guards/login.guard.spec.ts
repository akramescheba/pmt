import { loginGuard } from './login.guard';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

jest.mock('@angular/core', () => ({
  ...jest.requireActual('@angular/core'),
  inject: (token: any) => {
    if (token === Router) return routerMock;
    if (token === ToastrService) return toastrMock;
    return null;
  }
}));

const routerMock = {
  navigate: jest.fn()
};

const toastrMock = {
  success: jest.fn()
};

describe('loginGuard', () => {
  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('should return true if no token is present', () => {
    const result = loginGuard({} as any, {} as any);
    expect(result).toBe(true);
    expect(toastrMock.success).not.toHaveBeenCalled();
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  it('should return false and redirect if token is present', () => {
    localStorage.setItem('token', 'fake-token');
    const result = loginGuard({} as any, {} as any);
    expect(result).toBe(false);
    expect(toastrMock.success).toHaveBeenCalledWith(
      'Vous avez déjà une session ouverte',
      'Cette page n\'est pas disponible'
    );
    expect(routerMock.navigate).toHaveBeenCalledWith(['/dashboard']);
  });
});
