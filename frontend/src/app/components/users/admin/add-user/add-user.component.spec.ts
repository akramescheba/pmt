import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AddUserComponent } from './add-user.component';
import { of, throwError } from 'rxjs';
import { AppService } from '../../../services/app.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../auth/auth.service';

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;

  // Création de mocks pour les services utilisés dans le composant
  const appServiceMock = {
    getUsers: jest.fn().mockReturnValue(of([])),
    deleteUsers: jest.fn().mockReturnValue(of({})),
    patchUsers: jest.fn().mockReturnValue(of({})),
    logAction: jest.fn(),
  };

  const toastrMock = {
    success: jest.fn(),
    error: jest.fn(),
  };

  const authServiceMock = {
    getNom: jest.fn().mockReturnValue('Jean Testeur'),
    getRole: jest.fn().mockReturnValue('admin'),
  };

  beforeEach(async () => {

    jest.spyOn(console, 'error').mockImplementation(() => {});

    await TestBed.configureTestingModule({
      imports: [AddUserComponent,HttpClientTestingModule], 
      declarations: [], 
      providers: [
        { provide: AppService, useValue: appServiceMock },
        { provide: ToastrService, useValue: toastrMock },
        { provide: AuthService, useValue: authServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
