import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressHoursComponent } from './address-hours.component';

describe('AddressHoursComponent', () => {
  let component: AddressHoursComponent;
  let fixture: ComponentFixture<AddressHoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressHoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
