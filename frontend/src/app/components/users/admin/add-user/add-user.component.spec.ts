import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddUserComponent } from './add-user.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'; 
import { of } from 'rxjs';
import { AppService } from '../../../services/app.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../auth/auth.service';

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;

  const appServiceMock = {
    getUsers: jest.fn().mockReturnValue(of([{ id: 1, nom: 'User 1' }, { id: 2, nom: 'User 2' }])),
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
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, 
        AddUserComponent
      ],
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
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call handleClickUpdateUser and update button state', () => {
    const updateUserSpy = jest.spyOn(component, 'updateUser');
    const isDisplayButtonSpy = jest.spyOn(component, 'isDisplayButton');
    component.selectedUser = { id: 1, nom: 'Test User', role: 'admin' };
    component.handleClickUpdateUser();
    expect(updateUserSpy).toHaveBeenCalled();
    expect(isDisplayButtonSpy).toHaveBeenCalled();
  });
  
  it('should call handleClickDeleteUsers and update button state', () => {
    const deleteUsersSpy = jest.spyOn(component, 'deleteUsers');
    const isDisplayButtonSpy = jest.spyOn(component, 'isDisplayButton');
    component.handleClickDeleteUsers();
    expect(deleteUsersSpy).toHaveBeenCalled();
    expect(isDisplayButtonSpy).toHaveBeenCalled();
  });

  it('should call handleClickCancelButton and update button state', () => {
    const cancelButtonSpy = jest.spyOn(component, 'cancelButton');
    const isDisplayButtonSpy = jest.spyOn(component, 'isDisplayButton');
    component.handleClickCancelButton();
    expect(cancelButtonSpy).toHaveBeenCalled();
    expect(isDisplayButtonSpy).toHaveBeenCalled();
  });

  it('should toggle isButton state with isDisplayButton()', () => {
    component.isButton = false;
    component.isDisplayButton();
    expect(component.isButton).toBe(true);

    component.isDisplayButton();
    expect(component.isButton).toBe(false);
  });

  it('should set isButton to false with cancelButton()', () => {
    component.isButton = true;
    component.cancelButton();
    expect(component.isButton).toBe(false);
  });
  it('should call selectUser and update selectedUser', () => {
    const user = { id: 1, nom: 'User 1' };
    component.selectUser(user);
    expect(component.selectedUser).toEqual({ id: 1, nom: 'User 1' });
  });
});
