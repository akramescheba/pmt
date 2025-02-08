import { TestBed } from '@angular/core/testing';
import { CanActivateFn,Router } from '@angular/router';
import { loginGuard } from './login.guard';
import { ToastrService } from 'ngx-toastr';


describe('loginGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => loginGuard(...guardParameters));


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Router],
      providers: [ToastrService]
    });

  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
