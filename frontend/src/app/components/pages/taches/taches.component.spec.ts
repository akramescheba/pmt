import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TachesComponent } from './taches.component';
import { ToastrModule } from 'ngx-toastr';

describe('TachesComponent', () => {
  let component: TachesComponent;
  let fixture: ComponentFixture<TachesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TachesComponent, ToastrModule.forRoot()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TachesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
