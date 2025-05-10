import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtaskformComponent } from './addtaskform.component';

describe('AddtaskformComponent', () => {
  let component: AddtaskformComponent;
  let fixture: ComponentFixture<AddtaskformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddtaskformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddtaskformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
