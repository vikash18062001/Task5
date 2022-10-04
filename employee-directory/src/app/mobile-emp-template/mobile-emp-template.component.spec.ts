import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileEmpTemplateComponent } from './mobile-emp-template.component';

describe('MobileEmpTemplateComponent', () => {
  let component: MobileEmpTemplateComponent;
  let fixture: ComponentFixture<MobileEmpTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileEmpTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileEmpTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
