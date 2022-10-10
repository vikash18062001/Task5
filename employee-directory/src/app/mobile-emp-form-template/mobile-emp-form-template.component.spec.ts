import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileEmpFormTemplateComponent } from './mobile-emp-form-template.component';

describe('MobileEmpFormTemplateComponent', () => {
  let component: MobileEmpFormTemplateComponent;
  let fixture: ComponentFixture<MobileEmpFormTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileEmpFormTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileEmpFormTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
