import { TestBed } from '@angular/core/testing';
import { AuthguardService } from './authguard.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

describe('AuthguardService', () => {
  let service: AuthguardService;
  let router: Router;

  const mockRouter = {
    navigate: jest.fn()
  };

  const mockToastr = {
    warning: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
    success: jest.fn()
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthguardService,
        { provide: Router, useValue: mockRouter },
        { provide: ToastrService, useValue: mockToastr }
      ]
    });

    service = TestBed.inject(AuthguardService);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should allow activation when token exists in localStorage', () => {
    localStorage.setItem('token', 'test-token');
    expect(service.canActivate()).toBe(true);
  });

  it('should deny activation and navigate to login when token is missing', () => {
    localStorage.removeItem('token');
    const result = service.canActivate();
    expect(result).toBe(false);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });
});
