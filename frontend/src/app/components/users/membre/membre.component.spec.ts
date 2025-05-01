import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MembreComponent } from './membre.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppService } from '../../services/app.service';
import { AuthService } from '../../auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';

describe('MembreComponent', () => {
  let component: MembreComponent;
  let fixture: ComponentFixture<MembreComponent>;

  let appServiceMock: any;
  let toastrMock: any;

  beforeEach(async () => {
    appServiceMock = {
      getProjects: jest.fn(),
      patchProject: jest.fn(),
      deleteProject: jest.fn(),
      logAction: jest.fn(),
      onClickVoirHistorique: jest.fn(),
    };

    toastrMock = {
      success: jest.fn(),
      error: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [MembreComponent, HttpClientTestingModule],
      providers: [
        { provide: AppService, useValue: appServiceMock },
        { provide: ToastrService, useValue: toastrMock },
        {
          provide: AuthService,
          useValue: {
            getNom: () => 'Jean Dupont',
            getRole: () => 'Membre',
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MembreComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    jest.clearAllMocks();  
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should load projects on init', () => {
    const mockProjects = [{ id: 1, nom: 'Projet Test' }];
    appServiceMock.getProjects.mockReturnValue(of(mockProjects));

    component.ngOnInit();

    expect(appServiceMock.getProjects).toHaveBeenCalled();
    expect(component.projectList).toEqual(mockProjects);
  });

  it('should select a project and toggle editing mode', () => {
    const project = { id: 1, nom: 'Projet Test' };

    component.selectProject(project);

    expect(component.selectedProject).toEqual(project);
    expect(component.isDisplayCard).toBe(true);
  });

  it('should delete project and log the action', () => {
    const fakeProject = {
      id: 1,
      nom: 'Projet Test',
    };
  
    component.selectedProject = fakeProject;
    component.userNom = 'Test User';
    component.userRole = 'Admin';
  
    jest.spyOn(appServiceMock, 'deleteProject').mockReturnValue(of({}));
    jest.spyOn(appServiceMock, 'logAction');
  
    component.deleteProject();
  
    expect(appServiceMock.deleteProject).toHaveBeenCalledWith(fakeProject.id);
    expect(appServiceMock.logAction).toHaveBeenCalledWith(
      `Le projet  "${fakeProject.nom}"  a été supprimé`,
      'Admin',
      'Test User'
    );
  });
  

  it('should cancel edit and hide card', () => {
    component.selectedProject = { id: 1 };
    component.cancelEdit();

    expect(component.selectedProject).toBeNull();
  });

  it('should toggle edit/save button', () => {
    component.editButton();
    expect(component.isDisplayButton).toBe(true);

    component.saveButton();
    expect(component.isDisplayButton).toBe(false);
  });

  it('should call handleVoirHistoriqueClick from appService', () => {
    component.handleVoirHistoriqueClick();
    expect(appServiceMock.onClickVoirHistorique).toHaveBeenCalled();
  });
});
