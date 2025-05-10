import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';  // Assurez-vous d'importer 'of' ici
import { AddProjectComponent } from './add-project.component';  // Importez le composant ici
import { AppService } from '../../../services/app.service';
import { AuthService } from '../../../auth/auth.service';
import { ToastrService } from 'ngx-toastr';

describe('AddProjectComponent', () => {
  let component: AddProjectComponent;
  let appServiceMock: Partial<AppService>;
  let authServiceMock: Partial<AuthService>;
  let toastrMock: any;
  let routerMock: Partial<Router>;

  beforeEach(() => {
    routerMock = {
      navigate: jest.fn()
    };
    toastrMock = {
      success: jest.fn(),
      error: jest.fn()
    };
    appServiceMock = {
      getProjects: jest.fn(),
      patchProject: jest.fn(),
      deleteProject: jest.fn(),
      logAction: jest.fn()
    };
    authServiceMock = {
      getNom: jest.fn().mockReturnValue('Jean Dupont'),
      getRole: jest.fn().mockReturnValue('Administrateur')
    };
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AddProjectComponent,  // Ajoutez le composant ici
        { provide: AppService, useValue: appServiceMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: ToastrService, useValue: toastrMock },
        { provide: Router, useValue: routerMock }
      ]
    });
    component = TestBed.inject(AddProjectComponent);  // Correcte l'injection du composant
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load projects on init', fakeAsync(() => {
    const mockProjects = [
      { id: 1, nom: 'Projet 1' },
      { id: 2, nom: 'Projet 2' }
    ];
    (appServiceMock.getProjects as jest.Mock).mockReturnValue(of(mockProjects));  // Importer 'of' ici
    component.loadProjects();
    tick();
    expect(component.projectList).toEqual(mockProjects);
    expect(toastrMock.success).toHaveBeenCalledWith('Projets chargés avec succès !');
  }));

  it('should select a project and enable editing card', () => {
    const mockProject = { id: 1, nom: 'Projet Test' };
    component.selectProject(mockProject);

    expect(component.selectedProject).toEqual(mockProject);
    expect(component.isDisplayCard).toBe(true);
  });

  it('should cancel edit and toggle display card', () => {
    component.isDisplayCard = true;
    component.cancelEdit();
    expect(component.isDisplayCard).toBe(false);
    expect(component.selectedProject).toBeNull();
  });

  it('should toggle display card', () => {
    component.isDisplayCard = false;
    component.displayCard();
    expect(component.isDisplayCard).toBe(true);
    component.editingCard();
    expect(component.isDisplayCard).toBe(false);
  });

  
  // it('should call handleUpdateProject and toggle display card', () => {
  //   component.selectedProject = { id: 1, nom: 'Projet Test' };
  //   const updateProjectSpy = jest.spyOn(component, 'updateProject');
  //   const displayCardSpy = jest.spyOn(component, 'displayCard');
  //   component.handleUpdateProject();
  //   expect(updateProjectSpy).toHaveBeenCalled();
  //   expect(displayCardSpy).toHaveBeenCalled();
  // });
  

  it('should call ngOnInit and load projects', fakeAsync(() => {
    const mockProjects = [
      { id: 1, nom: 'Projet 1' },
      { id: 2, nom: 'Projet 2' }
    ];
    (appServiceMock.getProjects as jest.Mock).mockReturnValue(of(mockProjects));
    
    component.ngOnInit();
    tick();
    
    expect(component.projectList).toEqual(mockProjects);
  }));

  it('should call loadPage and navigate to the current route', () => {
    component.loadPage();
    expect(routerMock.navigate).toHaveBeenCalledWith([routerMock.url]);
  });

});
