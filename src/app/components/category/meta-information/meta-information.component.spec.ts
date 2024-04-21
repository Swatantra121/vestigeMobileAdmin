import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetaInformationComponent } from './meta-information.component';

describe('MetaInformationComponent', () => {
  let component: MetaInformationComponent;
  let fixture: ComponentFixture<MetaInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetaInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetaInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
