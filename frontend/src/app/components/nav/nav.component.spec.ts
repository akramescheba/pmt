import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavComponent } from './nav.component';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';


describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  let routerMock: any;
  let authServiceMock: any;

  beforeEach(async () => {
    routerMock = {
      navigate: jest.fn()
    };

    authServiceMock = {
      logOut: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [NavComponent],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: AuthService, useValue: authServiceMock }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set userRole from localStorage on init', () => {
    localStorage.setItem('role', 'Membre');
    component.ngOnInit();
    expect(component.userRole).toBe('Membre');
  });

  it('should navigate to /admin if userRole is Administrateur', () => {
    component.userRole = 'Administrateur';
    component.onClickMonCompte();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/admin']);
  });

  it('should navigate to /membre if userRole is Membre', () => {
    component.userRole = 'Membre';
    component.onClickMonCompte();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/membre']);
  });

  it('should navigate to /observateur if userRole is Observateur', () => {
    component.userRole = 'Observateur';
    component.onClickMonCompte();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/observateur']);
  });

  it('should log an error for unknown role', () => {
    console.error = jest.fn();
    component.userRole = 'Inconnu';
    component.onClickMonCompte();
    expect(console.error).toHaveBeenCalledWith("Une erreur s'est produite");
  });

  it('should call auth.logOut on loggedOut', () => {
    component.loggedOut();
    expect(authServiceMock.logOut).toHaveBeenCalled();
  });
});
