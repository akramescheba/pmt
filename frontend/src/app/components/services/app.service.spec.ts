import { TestBed } from '@angular/core/testing';
import { AppService } from './app.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { dev_environment } from '../../../environment/environment.dev';

describe('AppService', () => {
  let service: AppService;
  let httpMock: HttpTestingController;
  let mockRouter = { navigate: jest.fn() };

  beforeEach(() => {
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

  // PROJECTS
  it('should fetch projects', () => {
    const dummyProjects = [{ id: 1 }, { id: 2 }];

    service.getProjects().subscribe(projects => {
      expect(projects.length).toBe(2);
      expect(projects).toEqual(dummyProjects);
    });

    const req = httpMock.expectOne(`${dev_environment.API_BD_URL}/projet`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyProjects);
  });

  it('should fetch project by ID', () => {
    service.getProjectById(1).subscribe();
    const req = httpMock.expectOne(`${dev_environment.API_BD_URL}/projet/1`);
    expect(req.request.method).toBe('GET');
  });

  it('should post a project', () => {
    const data = { name: 'Test' };
    service.postProject(data).subscribe();
    const req = httpMock.expectOne(`${dev_environment.API_BD_URL}/projet`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should put a project', () => {
    service.putProject(1, { name: 'Updated' }).subscribe();
    const req = httpMock.expectOne(`${dev_environment.API_BD_URL}/projet/1`);
    expect(req.request.method).toBe('PUT');
  });

  it('should patch a project', () => {
    service.patchProject(1, { status: 'done' }).subscribe();
    const req = httpMock.expectOne(`${dev_environment.API_BD_URL}/projet/1`);
    expect(req.request.method).toBe('PATCH');
  });

  it('should delete a project', () => {
    service.deleteProject(1).subscribe();
    const req = httpMock.expectOne(`${dev_environment.API_BD_URL}/projet/1`);
    expect(req.request.method).toBe('DELETE');
  });

  // USERS
  it('should fetch users', () => {
    service.getUsers().subscribe();
    const req = httpMock.expectOne(`${dev_environment.API_BD_URL}/utilisateur`);
    expect(req.request.method).toBe('GET');
  });

  it('should fetch user by id', () => {
    service.getUserById(1, {}).subscribe();
    const req = httpMock.expectOne(`${dev_environment.API_BD_URL}/utilisateur/1`);
    expect(req.request.method).toBe('GET');
  });

  it('should post a user', () => {
    const user = { name: 'User' };
    service.postUsers(user).subscribe();
    const req = httpMock.expectOne(`${dev_environment.API_BD_URL}/utilisateur`);
    expect(req.request.method).toBe('POST');
  });

  it('should patch a user', () => {
    service.patchUsers(1, { email: 'test@mail.com' }).subscribe();
    const req = httpMock.expectOne(`${dev_environment.API_BD_URL}/utilisateur/1`);
    expect(req.request.method).toBe('PATCH');
  });

  it('should delete a user', () => {
    service.deleteUsers(1).subscribe();
    const req = httpMock.expectOne(`${dev_environment.API_BD_URL}/utilisateur/1`);
    expect(req.request.method).toBe('DELETE');
  });

  // HISTORY
  it('should post log action', () => {
    service.logAction('connexion', 'Alice', 'Admin');
    const req = httpMock.expectOne(`${dev_environment.API_BD_URL}/historique`);
    expect(req.request.method).toBe('POST');
  });

  it('should fetch history', () => {
    service.getHistory().subscribe();
    const req = httpMock.expectOne(`${dev_environment.API_BD_URL}/historique`);
    expect(req.request.method).toBe('GET');
  });

  it('should delete history', () => {
    service.deleteHistory(1).subscribe();
    const req = httpMock.expectOne(`${dev_environment.API_BD_URL}/historique/1`);
    expect(req.request.method).toBe('DELETE');
  });

  it('should navigate to historiques on click', () => {
    service.onClickVoirHistorique();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/historiques']);
  });
});
