import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TachesComponent } from './taches.component';
import { UserService, User } from '../../services/user.service';
import { TaskService } from '../../services/task.service';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs'; 



describe('TachesComponent', () => {
  let component: TachesComponent;
  let taskServiceMock: any;
  let userServiceMock: any;
  let toastrMock: any;

  const mockUsers: User[] = [
    { id: 1, nom: 'Alice', email: 'alice@example.com' },
    { id: 2, nom: 'Bob', email: 'bob@example.com' }
  ];

  beforeEach(() => {
    toastrMock = {
      success: jest.fn(),
      error: jest.fn(),
      info: jest.fn()
    };
    taskServiceMock = {
      postTask: jest.fn()
    };
    userServiceMock = {
      getAllUsers: jest.fn()
    };

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        CommonModule,
        FontAwesomeModule
      ],
      providers: [
        TachesComponent,
        FormBuilder,
        { provide: ToastrService, useValue: toastrMock },
        { provide: TaskService, useValue: taskServiceMock },
        { provide: UserService, useValue: userServiceMock }
      ]
    });

    component = TestBed.inject(TachesComponent);
    jest.clearAllMocks();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty fields and assignments as a FormArray', () => {
    expect(component.taskForm).toBeInstanceOf(FormGroup);
    expect(component.assignments).toBeInstanceOf(FormArray);
    expect(component.taskForm.controls['titre'].value).toBe('');
    expect(component.taskForm.controls['description'].value).toBe('');
    expect(component.assignments.length).toBe(0);
  });

  it('should load users on init', () => {
    const mockUsers: User[] = [
      { id: 1, nom: 'Alice', email: 'alice@example.com' },
      { id: 2, nom: 'Bob', email: 'bob@example.com' }
    ];
  
    userServiceMock.getAllUsers.mockReturnValue(of(mockUsers));
  
    component.ngOnInit();
  
    expect(userServiceMock.getAllUsers).toHaveBeenCalled();
    expect(component.users.length).toBe(2);
    expect(component.users[0].nom).toBe('Alice');
  });

  it('should add a new assignment group to assignments', () => {
    const initialCount = component.assignments.length;
    component.addAssignment();

    expect(component.assignments.length).toBe(initialCount + 1);
    expect(component.assignments.at(initialCount).get('userId')).toBeTruthy();
  });

  it('should remove an assignment at given index', () => {
    component.addAssignment(); 
    component.addAssignment();

    expect(component.assignments.length).toBe(2);

    component.removeAssignment(0);
    expect(component.assignments.length).toBe(1);
  });

  it('should show error if form is invalid when handleSubmit is called', () => {
    component.taskForm.setValue({
      titre: '',
      description: '',
      tacheID: '',
      assignments: []
    });

    component.handleSubmit();

    expect(toastrMock.error).toHaveBeenCalledWith('Veuillez remplir tous les champs obligatoires.');
  });



});