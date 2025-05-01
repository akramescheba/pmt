import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AdduserformComponent } from './adduserform.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { AppService } from '../../services/app.service';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';

describe('AdduserformComponent', () => {
  let component: AdduserformComponent;
  let fixture: ComponentFixture<AdduserformComponent>;

  const appServiceMock = {
    postUsers: jest.fn()
  };

  const toastrMock = {
    success: jest.fn(),
    error: jest.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdduserformComponent, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: AppService, useValue: appServiceMock },
        { provide: ToastrService, useValue: toastrMock }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdduserformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.userForm).toBeDefined();
    expect(component.userForm.controls['nom']).toBeTruthy();
    expect(component.userForm.controls['email']).toBeTruthy();
    expect(component.userForm.controls['role']).toBeTruthy();
    expect(component.userForm.controls['password']).toBeTruthy();
    expect(component.userForm.controls['repassword']).toBeTruthy();
  });

  it('should open and close the add user form', () => {
    component.openAddUserForm();
    expect(component.isAddUserOpen).toBeTruthy();

    component.closeAddUserForm();
    expect(component.isAddUserOpen).toBeFalsy();
  });

  it('should submit form if valid', fakeAsync(() => {
    const formData = {
      nom: 'Jean',
      email: 'jean@example.com',
      role: 'Admin',
      password: '1234',
      repassword: '1234'
    };

    component.userForm.setValue(formData);
    appServiceMock.postUsers.mockReturnValue(of({ success: true }));

    component.onSubmit();
    tick();

    expect(appServiceMock.postUsers).toHaveBeenCalledWith(formData);
    expect(toastrMock.success).toHaveBeenCalledWith('Utilisateur ajouté avec succès');
    expect(component.userForm.pristine).toBeTruthy();
    expect(component.isAddUserOpen).toBeFalsy();
  }));

  it('should handle submission error', fakeAsync(() => {
    const formData = {
      nom: 'Jean',
      email: 'jean@example.com',
      role: 'Admin',
      password: '1234',
      repassword: '1234'
    };

    component.userForm.setValue(formData);
    appServiceMock.postUsers.mockReturnValue(throwError(() => new Error('Erreur')));

    component.onSubmit();
    tick();

    expect(appServiceMock.postUsers).toHaveBeenCalledWith(formData);
    expect(toastrMock.success).toHaveBeenCalledWith("Erreur lors de l'ajout");
  }));

  it('should not submit if form is invalid', () => {
    component.userForm.setValue({
      nom: '',
      email: '',
      role: '',
      password: '',
      repassword: ''
    });

    component.onSubmit();

    expect(appServiceMock.postUsers).not.toHaveBeenCalled();
    expect(toastrMock.success).not.toHaveBeenCalled();
  });
});
