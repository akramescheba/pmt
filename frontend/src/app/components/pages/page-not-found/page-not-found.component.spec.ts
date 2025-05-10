import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found.component';

describe('PageNotFoundComponent', () => {
  let component: PageNotFoundComponent;
  let routerMock: any;

  beforeEach(() => {
    routerMock = {
      navigate: jest.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: routerMock }
      ]
    });

    component = new PageNotFoundComponent(routerMock as Router);
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should get user role from localStorage on init', () => {
    localStorage.setItem('role', 'Membre');
    component.ngOnInit();

    expect(component.userRole).toBe('Membre');
  });

  it('should navigate to /admin when user is Administrateur', () => {
    component.userRole = 'Administrateur';
    component.onClickMonCompte();

    expect(routerMock.navigate).toHaveBeenCalledWith(['/admin']);
  });

  it('should navigate to /membre when user is Membre', () => {
    component.userRole = 'Membre';
    component.onClickMonCompte();

    expect(routerMock.navigate).toHaveBeenCalledWith(['/membre']);
  });

  it('should navigate to /observateur when user is Observateur', () => {
    component.userRole = 'Observateur';
    component.onClickMonCompte();

    expect(routerMock.navigate).toHaveBeenCalledWith(['/observateur']);
  });

  it('should log error and not navigate if role is unknown or null', () => {
    console.error = jest.fn();
    component.userRole = null;

    component.onClickMonCompte();

    expect(console.error).toHaveBeenCalledWith("Une erreur s'est produite");
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });
});