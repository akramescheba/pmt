import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddUserComponent } from './add-user.component';
import { AdduserformComponent } from '../../../formulaires/adduserform/adduserform.component';
import { AppService } from '../../../services/app.service';
import { AuthService } from '../../../auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { fakeAsync, tick } from '@angular/core/testing';

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let appServiceMock: any;
  let authServiceMock: any;
  let toastrMock: any;

  const mockUsers = [
    { id: 1, nom: 'Alice' },
    { id: 2, nom: 'Bob' }
  ];

  beforeEach(() => {
    authServiceMock = {
      getNom: jest.fn().mockReturnValue('Jean Dupont'),
      getRole: jest.fn().mockReturnValue('Administrateur')
    };
    toastrMock = {
      success: jest.fn(),
      error: jest.fn()
    };
    appServiceMock = {
      getUsers: jest.fn(),
      patchUsers: jest.fn(),
      deleteUsers: jest.fn(),
      logAction: jest.fn()
    };

    TestBed.configureTestingModule({
      declarations: [],
      imports: [AddUserComponent, AdduserformComponent,
        HttpClientTestingModule,
        ReactiveFormsModule,
        CommonModule,
        FontAwesomeModule
      ],
      providers: [
        FormBuilder,
        { provide: AppService, useValue: appServiceMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: ToastrService, useValue: toastrMock }
      ]
    });

    component = TestBed.createComponent(AddUserComponent).componentInstance;
    jest.clearAllMocks();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should select a user', () => {
    const user = { id: 1, nom: 'Alice' };
    component.selectUser(user);

    expect(component.selectedUser).toEqual(user);
  });

  it('should toggle isButton when isDisplayButton is called', () => {
    component.isButton = false;
    component.isDisplayButton();

    expect(component.isButton).toBe(true);

    component.isDisplayButton();
    expect(component.isButton).toBe(false);
  });
  it('should hide button when cancelButton is called', () => {
    component.isButton = true;
    component.cancelButton();

    expect(component.isButton).toBeFalsy();
  });
});