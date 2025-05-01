import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ModalComponent } from './modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppService } from '../../services/app.service';
import { AuthService } from '../../auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  const mockAppService = {
    postProject: jest.fn(),
    logAction: jest.fn(),
  };

  const mockAuthService = {
    getNom: jest.fn(() => 'AKRA MESCHEBA'),
    getRole: jest.fn(() => 'Administrateur'),
  };

  const mockToastr = {
    success: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalComponent, ReactiveFormsModule],
      providers: [
        { provide: AppService, useValue: mockAppService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: ToastrService, useValue: mockToastr },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should open and close the modal', () => {
    component.openModal();
    expect(component.isModalOpen).toBeTruthy();

    component.closeModal();
    expect(component.isModalOpen).toBeFalsy();
  });

  it('should initialize the form', () => {
    expect(component.projectForm).toBeDefined();
    expect(component.projectForm.controls['nom']).toBeDefined();
  });

  it('should submit form when valid', fakeAsync(() => {
    const formValue = {
      nom: 'Projet Test',
      objectif: 'Objectif',
      context: 'Contexte',
      description: 'Description',
      statut: 'En cours',
      date_debut: '2024-01-01',
      date_fin: '2024-12-31',
    };
  
    component.projectForm.setValue(formValue);
  
    const mockResponse = { nom: 'Projet Test' };
    mockAppService.postProject.mockReturnValue(of(mockResponse));
  
    component.onSubmit();
    tick();
  
    expect(mockAppService.postProject).toHaveBeenCalledWith(formValue);
    expect(mockAppService.logAction).toHaveBeenCalledWith(
      `L'utilisateur ${mockResponse.nom} a été mis à jour`,
      'AKRA MESCHEBA ',
      'Administrateur'
    );
    expect(mockToastr.success).toHaveBeenCalledWith('Projet ajouté avec succès');
    expect(component.isModalOpen).toBe(false);
  }));
  



  it('should handle errors on submit', fakeAsync(() => {
    component.projectForm.setValue({
      nom: 'Projet Test',
      objectif: 'Objectif',
      context: 'Contexte',
      description: 'Description',
      statut: 'En cours',
      date_debut: '2024-01-01',
      date_fin: '2024-12-31',
    });

    const consoleSpy = jest.spyOn(console, 'log');
    mockAppService.postProject.mockReturnValue(throwError(() => new Error('Erreur')));

    component.onSubmit();
    tick();

    expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
  }));
});
