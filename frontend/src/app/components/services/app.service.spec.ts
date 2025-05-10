import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Router } from '@angular/router';

import { AppService } from './app.service';
import { dev_environment } from '../../../environment/environment.dev';


type TestRequest = ReturnType<HttpTestingController['expectOne']>;

describe('AppService', () => {
  let service: AppService;
  let httpMock: HttpTestingController;
  let mockRouter: Partial<Router>;

  beforeEach(() => {
    mockRouter = {
      navigate: jest.fn()
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AppService,
        { provide: Router, useValue: mockRouter }
      ]
    });

    service = TestBed.inject(AppService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Projet API methods', () => {
    it('should fetch projects', () => {
      const dummyProjects = [{ id: 1, nom: 'Projet A' }];

      service.getProjects().subscribe(projects => {
        expect(projects).toEqual(dummyProjects);
      });

      const req: TestRequest = httpMock.expectOne(`${dev_environment.API_BD_URL}/projet`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyProjects);
    });

    it('should get project by ID', () => {
      const dummyProject = { id: 1, nom: 'Projet B' };

      service.getProjectById(1).subscribe(project => {
        expect(project).toEqual(dummyProject);
      });

      const req: TestRequest = httpMock.expectOne(`${dev_environment.API_BD_URL}/projet/1`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyProject);
    });

    it('should post new project', () => {
      const newProject = { nom: 'Nouveau projet' };
      const response = { id: 2, ...newProject };

      service.postProject(newProject).subscribe(res => {
        expect(res).toEqual(response);
      });

      const req: TestRequest = httpMock.expectOne(`${dev_environment.API_BD_URL}/projet`);
      expect(req.request.method).toBe('POST');
      req.flush(response);
    });

    it('should update project', () => {
      const updatedProject = { id: 1, nom: 'Projet mis à jour' };

      service.updateProject(updatedProject).subscribe(res => {
        expect(res).toEqual(updatedProject);
      });

      const req: TestRequest = httpMock.expectOne(`${dev_environment.API_BD_URL}/projet/1`);
      expect(req.request.method).toBe('PUT');
      req.flush(updatedProject);
    });

    it('should delete project', () => {
      service.deleteProject(1).subscribe();

      const req: TestRequest = httpMock.expectOne(`${dev_environment.API_BD_URL}/projet/1`);
      expect(req.request.method).toBe('DELETE');
      req.flush({});
    });
  });

  describe('Utilisateur API methods', () => {
    it('should fetch users', () => {
      const dummyUsers = [{ id: 1, nom: 'Alice' }];

      service.getUsers().subscribe(users => {
        expect(users).toEqual(dummyUsers);
      });

      const req: TestRequest = httpMock.expectOne(`${dev_environment.API_BD_URL}/utilisateur`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyUsers);
    });

    it('should post new user', () => {
      const newUser = { nom: 'Bob', email: 'bob@example.com' };
      const response = { id: 2, ...newUser };

      service.postUsers(newUser).subscribe(res => {
        expect(res).toEqual(response);
      });

      const req: TestRequest = httpMock.expectOne(`${dev_environment.API_BD_URL}/utilisateur`);
      expect(req.request.method).toBe('POST');
      req.flush(response);
    });

    it('should patch user', () => {
      const updateData = { nom: 'Alice modifiée' };

      service.patchUsers(1, updateData).subscribe(res => {
        expect(res).toEqual(updateData);
      });

      const req: TestRequest = httpMock.expectOne(`${dev_environment.API_BD_URL}/utilisateur/1`);
      expect(req.request.method).toBe('PATCH');
      req.flush(updateData);
    });

    it('should delete user', () => {
      service.deleteUsers(1).subscribe();

      const req: TestRequest = httpMock.expectOne(`${dev_environment.API_BD_URL}/utilisateur/1`);
      expect(req.request.method).toBe('DELETE');
      req.flush({});
    });
  });

  describe('Historique (log) methods', () => {
    it('should send log action to history API', () => {
      const action = 'Modification utilisateur';
      const username = 'Admin';
      const role = 'Administrateur';

      service.logAction(action, username, role);

      const req: TestRequest = httpMock.expectOne(`${dev_environment.API_BD_URL}/historique`);
      expect(req.request.method).toBe('POST');
      req.flush({});
    });
    it('should create', () => {
      expect(service).toBeTruthy();
    });
    it('should fetch history logs', () => {
      const dummyLogs = [{ action: 'Login', timestamp: new Date() }];

      service.getHistory().subscribe(logs => {
        expect(logs).toEqual(dummyLogs);
      });

      const req: TestRequest = httpMock.expectOne(`${dev_environment.API_BD_URL}/historique`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyLogs);
    });

    it('should delete history entry', () => {
      service.deleteHistory(1).subscribe();

      const req: TestRequest = httpMock.expectOne(`${dev_environment.API_BD_URL}/historique/1`);
      expect(req.request.method).toBe('DELETE');
      req.flush({});
    });
  });

  describe('Navigation methods', () => {
    it('should navigate to historiques page', () => {
      service.onClickVoirHistorique();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/historiques']);
    });
  });
});