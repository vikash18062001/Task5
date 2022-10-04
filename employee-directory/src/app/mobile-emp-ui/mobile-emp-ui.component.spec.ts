import { ComponentFixture, TestBed } from '@angular/core/testing';

import MobileEmpUiComponent from './mobile-emp-ui.component';

describe('MobileEmpUiComponent', () => {
  let component: MobileEmpUiComponent;
  let fixture: ComponentFixture<MobileEmpUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileEmpUiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileEmpUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
