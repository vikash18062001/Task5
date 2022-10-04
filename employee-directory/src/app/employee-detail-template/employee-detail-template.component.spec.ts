import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDetailTemplateComponent } from './employee-detail-template.component';

describe('EmployeeDetailTemplateComponent', () => {
  let component: EmployeeDetailTemplateComponent;
  let fixture: ComponentFixture<EmployeeDetailTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeDetailTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeDetailTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
