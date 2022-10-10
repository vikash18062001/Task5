import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileFormShowComponent } from './mobile-form-show.component';

describe('MobileFormShowComponent', () => {
  let component: MobileFormShowComponent;
  let fixture: ComponentFixture<MobileFormShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileFormShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileFormShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
