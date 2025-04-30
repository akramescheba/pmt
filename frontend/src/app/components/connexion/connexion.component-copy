import { ComponentFixture, TestBed } from '@angular/core/testing';
import {ReactiveFormsModule, FormBuilder} from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import {AuthService} from '../auth/auth.service';
import {AppService} from '../services/app.service';
import { ConnexionComponent } from './connexion.component';
import { AuthComponent } from '../auth/auth.component';

describe('ConnexionComponent', () => {
  let component: ConnexionComponent;
  let fixture: ComponentFixture<ConnexionComponent>;
  let authservice: AuthService;
  let appservice: AppService;
  let formBuilder: FormBuilder;
  let router: RouterTestingModule;
  let http: HttpClientTestingModule;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConnexionComponent, HttpClientTestingModule, RouterTestingModule, ToastrModule.forRoot() ],
      providers: [AuthComponent,
        {provide: AuthService, useClass: AuthService},
        {provide: AppService, useClass: AppService},
        FormBuilder
      ],
      
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnexionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form', ()=>{
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.controls['email']).toBeDefined();
    expect(component.loginForm.controls['psw']).toBeDefined();
  })
});
