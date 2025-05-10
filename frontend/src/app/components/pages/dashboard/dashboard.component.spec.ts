import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { AppService } from '../../services/app.service';
import { ToastrService } from 'ngx-toastr';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let httpMock: HttpTestingController;

  const mockProjects = [
    { id: 1, nom: 'Projet A' },
    { id: 2, nom: 'Projet B' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, CommonModule, FormsModule],
      providers: [
        DashboardComponent,
        AppService,
        {
          provide: ToastrService,
          useValue: {
            success: jest.fn(),
            error: jest.fn()
          }
        }
      ]
    });

    component = TestBed.inject(DashboardComponent);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load projects on ngOnInit', () => {
    component.ngOnInit();

    const req = httpMock.expectOne("http://localhost:8081/projet"); 
    req.flush(mockProjects);

    expect(component.projectList.length).toBe(2);
    expect(component.projectList).toEqual(mockProjects);
  });

  it('should handle error when loading projects fails', () => {
    const toastrMock = TestBed.inject(ToastrService) as any;
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    component.ngOnInit();

    const req = httpMock.expectOne("http://localhost:8081/projet"); 
    req.error(new ErrorEvent('Network error'));

    expect(toastrMock.error).toHaveBeenCalledWith('Impossible de charger les projets.');
    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  it('should select a project correctly', () => {
    const mockProject = { id: 1, nom: 'Projet A' };

    component.selectProject(mockProject);

    expect(component.selectedProject).toEqual(mockProject);
  });

  it('should toggle isDisplayButton when cancelButton is called', () => {
    component.isDisplayButton = false;
    component.cancelButton();

    expect(component.isDisplayButton).toBe(true);

    component.cancelButton();
    expect(component.isDisplayButton).toBe(false);
  });
});