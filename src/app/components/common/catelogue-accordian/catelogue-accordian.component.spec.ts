import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatelogueAccordianComponent } from './catelogue-accordian.component';

describe('CatelogueAccordianComponent', () => {
  let component: CatelogueAccordianComponent;
  let fixture: ComponentFixture<CatelogueAccordianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatelogueAccordianComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatelogueAccordianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
