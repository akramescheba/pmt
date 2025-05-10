import { TestBed, ComponentFixture, } from "@angular/core/testing";
import { fakeAsync, tick } from "@angular/core/testing";

import { TachesComponent } from "./taches.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ToastrService, ToastrModule } from "ngx-toastr";
import { TaskService } from "../../services/task.service";
import { UserService } from "../../services/user.service";
import { of } from "rxjs";

jest.mock("@emailjs/browser", () => ({
  send: jest.fn(() => Promise.resolve()),
}));

describe("TachesComponent", () => {
  let component: TachesComponent;
  let fixture: ComponentFixture<TachesComponent>;
  let toast: ToastrService;
  let taskService: TaskService;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TachesComponent,
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
      ],
      providers: [
        ToastrService,
        {
          provide: TaskService,
          useValue: {
            postTask: jest.fn().mockReturnValue(of({})),
          },
        },
        {
          provide: UserService,
          useValue: {
            getAllUsers: jest
              .fn()
              .mockReturnValue(
                of([{ id: 1, nom: "Jean", email: "jean@example.com" }])
              ),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TachesComponent);
    component = fixture.componentInstance;
    toast = TestBed.inject(ToastrService);
    taskService = TestBed.inject(TaskService);
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should initialize the form correctly", () => {
    expect(component.taskForm).toBeDefined();
    expect(component.taskForm.get("titre")).toBeTruthy();
  });

  it("should add and remove an assignment", () => {
    expect(component.assignments.length).toBe(0);
    component.addAssignment();
    expect(component.assignments.length).toBe(1);
    component.removeAssignment(0);
    expect(component.assignments.length).toBe(0);
  });

  it("should call onSubmit and sendMails if form is valid", () => {
    const onSubmitSpy = jest
      .spyOn(component, "onSubmit")
      .mockImplementation(() => {});
    const sendMailsSpy = jest
      .spyOn(component, "sendMails")
      .mockImplementation(() => {});

    component.taskForm.patchValue({
      titre: "Test Tâche",
      description: "Test Description ",
      assignments: [],
    });
    component.handleSubmit();
    expect(onSubmitSpy).toHaveBeenCalled();
    expect(sendMailsSpy).toHaveBeenCalled();
  });
  

});
