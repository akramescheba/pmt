import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AddProjectComponent } from './add-project.component';
import { AppService } from '../../../services/app.service';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';

describe('AddProjectComponent', () => {
  let component: AddProjectComponent;
  let fixture: ComponentFixture<AddProjectComponent>;

  const appServiceMock = {
    getProjects: jest.fn(),
  };

  const toastrMock = {
    success: jest.fn(),
    error: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AddProjectComponent],
      declarations: [],
      providers: [
        { provide: AppService, useValue: appServiceMock },
        { provide: ToastrService, useValue: toastrMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
