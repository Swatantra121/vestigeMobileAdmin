import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutVBDListComponent } from './about-vbd-list.component';

describe('AboutVBDListComponent', () => {
  let component: AboutVBDListComponent;
  let fixture: ComponentFixture<AboutVBDListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutVBDListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutVBDListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
